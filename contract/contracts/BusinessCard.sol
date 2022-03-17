// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BusinessCard is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _randNonce;
    string public name = "Non Fungible Business Card";
    struct CardMeta {
        address author;
        string uri;
        bool isTransferable;
        bool isEditable;
    }
    struct TicketMeta {
        uint256 tokenId;
        uint256 effectiveAt;
        uint64 amount;
        bool infinite;
    }

    mapping(uint256 => CardMeta) private cardMetaMap;
    mapping(uint32 => TicketMeta) tickets;

    constructor() ERC1155("") {}

    function print(
        string memory uri,
        bool isTransferable,
        bool isEditable,
        uint256 amount
    ) public {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId, amount, "");
        cardMetaMap[newItemId] = CardMeta(
            msg.sender,
            uri,
            isTransferable,
            isEditable
        );
    }

    function edit(uint256 id, string memory uri) public {
        CardMeta storage cardMeta = cardMetaMap[id];
        require(cardMeta.author == msg.sender, "It's not your card.");
        require(cardMeta.isEditable, "uneditable");
        cardMeta.uri = uri;
    }

    function issueTicket(
        uint256 id,
        uint256 effectiveDate,
        uint64 amount,
        bool infinite
    ) public returns (uint32) {
        require(msg.sender == cardMetaMap[id].author, "It's not your card.");
        _randNonce.increment();
        uint32 ticket = uint32(
            uint256(
                keccak256(
                    abi.encodePacked(
                        msg.sender,
                        block.timestamp,
                        _randNonce.current()
                    )
                )
            ) % (2**32)
        );
        uint256 effectiveAt = effectiveDate * 1 days;
        tickets[ticket] = TicketMeta(id, effectiveAt, amount, infinite);

        return ticket;
    }

    function receiveCard(uint32 ticket) public {
        TicketMeta storage ticketMeta = tickets[ticket];
        require(ticketMeta.tokenId != 0, "Ticket does not exist.");
        require(
            ticketMeta.amount > 0 || ticketMeta.infinite,
            "Ticket not available"
        );
        require(
            ticketMeta.effectiveAt > block.timestamp,
            "expiration of a term"
        );
        if (!ticketMeta.infinite) {
            ticketMeta.amount--;
        }

        CardMeta memory cardMeta = cardMetaMap[ticketMeta.tokenId];
        _safeTransferFrom(
            cardMeta.author,
            msg.sender,
            ticketMeta.tokenId,
            1,
            ""
        );
    }

    function burnTicket(uint32 ticket) public {
        TicketMeta storage ticketMeta = tickets[ticket];
        CardMeta memory cardMeta = cardMetaMap[ticketMeta.tokenId];
        require(ticketMeta.tokenId != 0, "Ticket does not exist.");
        require(cardMeta.author == msg.sender, "It's not your ticket.");
        ticketMeta.tokenId = 0;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return cardMetaMap[id].uri;
    }

    function _beforeTokenTransfer(
        address,
        address,
        address,
        uint256[] memory ids,
        uint256[] memory,
        bytes memory
    ) internal view override {
        for (uint256 i = 0; i < ids.length; i++) {
            uint256 tokenId = ids[i];
            require(cardMetaMap[tokenId].isTransferable, "non-transferable");
        }
    }
}
