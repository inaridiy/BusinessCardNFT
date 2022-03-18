// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract BusinessCard is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
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
    mapping(string => TicketMeta) private tickets;
    mapping(string => mapping(address => bool)) ticketUsageHistory;

    constructor() ERC1155("") {}

    function print(
        string memory _uri,
        bool _isTransferable,
        bool _isEditable,
        uint256 _amount
    ) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        cardMetaMap[newItemId] = CardMeta(
            msg.sender,
            _uri,
            _isTransferable,
            _isEditable
        );
        _mint(msg.sender, newItemId, _amount, "");
    }

    function edit(uint256 _id, string memory _uri) public {
        CardMeta storage cardMeta = cardMetaMap[_id];
        require(cardMeta.author == msg.sender, "It's not your card.");
        require(cardMeta.isEditable, "Editing is not permitted.");
        cardMeta.uri = _uri;
    }

    function ticket(string memory _ticket)
        public
        view
        returns (TicketMeta memory)
    {
        return tickets[_ticket];
    }

    function issueTicket(
        uint256 _id,
        string memory _ticket,
        uint256 _effectiveDate,
        uint64 _amount,
        bool _infinite
    ) public {
        require(msg.sender == cardMetaMap[_id].author, "It's not your card.");
        uint256 effectiveAt = block.timestamp + _effectiveDate * 1 days;
        tickets[_ticket] = TicketMeta(_id, effectiveAt, _amount, _infinite);
    }

    function receiveCard(string memory _ticket) public {
        TicketMeta storage ticketMeta = tickets[_ticket];
        require(ticketMeta.tokenId != 0, "Ticket does not exist.");
        require(
            ticketMeta.amount > 0 || ticketMeta.infinite,
            "Ticket not available"
        );
        require(
            ticketMeta.effectiveAt > block.timestamp,
            "expiration of a term"
        );
        require(
            !ticketUsageHistory[_ticket][msg.sender],
            "You have already received it."
        );
        if (!ticketMeta.infinite) {
            ticketMeta.amount--;
        }

        CardMeta memory cardMeta = cardMetaMap[ticketMeta.tokenId];
        ticketUsageHistory[_ticket][msg.sender] = true;
        _safeTransferFrom(
            cardMeta.author,
            msg.sender,
            ticketMeta.tokenId,
            1,
            ""
        );
    }

    function burnTicket(string memory _ticket) public {
        TicketMeta storage ticketMeta = tickets[_ticket];
        CardMeta memory cardMeta = cardMetaMap[ticketMeta.tokenId];
        require(ticketMeta.tokenId != 0, "Ticket does not exist.");
        require(cardMeta.author == msg.sender, "It's not your ticket.");
        ticketMeta.tokenId = 0;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return cardMetaMap[_id].uri;
    }

    function _beforeTokenTransfer(
        address,
        address from,
        address,
        uint256[] memory _ids,
        uint256[] memory,
        bytes memory
    ) internal view override {
        for (uint256 i = 0; i < _ids.length; i++) {
            CardMeta memory cardMeta = cardMetaMap[_ids[i]];
            require(
                cardMeta.isTransferable ||
                    cardMeta.author == msg.sender ||
                    cardMeta.author == from,
                "non-transferable"
            );
        }
    }
}
