// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "hardhat/console.sol";

contract NameCard is ERC1155SupplyUpgradeable {
    using ECDSAUpgradeable for bytes32;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    string public name;
    address private _signer;
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

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(string memory name_, address signer_)
        public
        initializer
    {
        __ERC1155Supply_init();
        name = name_;
        _signer = signer_;
    }

    modifier _verify(string memory uri_, bytes memory signature_) {
        require(
            _signer ==
                keccak256(abi.encodePacked(uri_))
                    .toEthSignedMessageHash()
                    .recover(signature_)
        );
        _;
    }

    function _print(
        address printer,
        string memory uri_,
        bool isTransferable_,
        bool isEditable_,
        uint256 amount_
    ) private {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        cardMetaMap[newItemId] = CardMeta(
            printer,
            uri_,
            isTransferable_,
            isEditable_
        );
        _mint(printer, newItemId, amount_, "");
    }

    function print(
        string memory uri_,
        bytes memory signature_,
        bool isTransferable_,
        bool isEditable_,
        uint256 amount_
    ) public _verify(uri_, signature_) {
        _print(msg.sender, uri_, isTransferable_, isEditable_, amount_);
    }

    function edit(
        uint256 id_,
        string memory uri_,
        bytes memory signature_
    ) public _verify(uri_, signature_) {
        CardMeta storage cardMeta = cardMetaMap[id_];
        require(cardMeta.author == msg.sender, "It's not your card.");
        require(cardMeta.isEditable, "Editing is not permitted.");
        emit URI(uri_, id_);
        cardMeta.uri = uri_;
    }

    function ticket(string memory _ticket)
        public
        view
        returns (TicketMeta memory)
    {
        return tickets[_ticket];
    }

    modifier ticketVerify(uint256 id_, string memory ticket_) {
        require(msg.sender == cardMetaMap[id_].author, "It's not your card.");
        require(tickets[ticket_].tokenId == 0, "Tickets that already exist.");
        _;
    }

    function createTicket(
        uint256 id_,
        string memory ticket_,
        uint256 effectiveTime_,
        uint64 amount_,
        bool infinite_
    ) public ticketVerify(id_, ticket_) {
        uint256 effectiveAt = block.timestamp + effectiveTime_;
        tickets[ticket_] = TicketMeta(id_, effectiveAt, amount_, infinite_);
    }

    function receiveCard(string memory ticket_) public {
        TicketMeta storage ticketMeta = tickets[ticket_];
        require(ticketMeta.tokenId != 0, "Ticket does not exist.");
        require(
            ticketMeta.amount > 0 || ticketMeta.infinite,
            "Ticket not available."
        );
        require(
            ticketMeta.effectiveAt > block.timestamp,
            "Ticket has expired."
        );
        require(
            !ticketUsageHistory[ticket_][msg.sender],
            "You have already received it."
        );
        if (!ticketMeta.infinite) {
            ticketMeta.amount--;
        }
        CardMeta memory cardMeta = cardMetaMap[ticketMeta.tokenId];
        ticketUsageHistory[ticket_][msg.sender] = true;
        _safeTransferFrom(
            cardMeta.author,
            msg.sender,
            ticketMeta.tokenId,
            1,
            ""
        );
    }

    function burnTicket(string memory _ticket) public {
        TicketMeta memory ticketMeta = tickets[_ticket];
        CardMeta memory cardMeta = cardMetaMap[ticketMeta.tokenId];
        require(cardMeta.author == msg.sender, "It's not your ticket.");
        delete tickets[_ticket];
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
