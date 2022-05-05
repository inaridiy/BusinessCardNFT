//SPDX-License-Identifier: GPL
pragma solidity ^0.8.4;

import "./MeishiFactory.sol";

contract MeishiTicketFactory is MeishiFactory {
    struct TicketMeta {
        uint256 tokenId;
        uint256 effectiveAt;
        uint64 amount;
        bool infinite;
    }
    mapping(string => TicketMeta) public tickets;
    mapping(string => mapping(address => bool)) internal ticketUsageHistory;
    mapping(address => string[]) internal ticketsOwner;

    function _createTicket(
        uint256 id_,
        string memory ticket_,
        uint256 effectiveTime_,
        uint64 amount_,
        bool infinite_
    ) internal {
        uint256 effectiveAt = block.timestamp + effectiveTime_;
        tickets[ticket_] = TicketMeta(id_, effectiveAt, amount_, infinite_);
        ticketsOwner[msg.sender].push(ticket_);
    }

    function createTicket(
        uint256 id_,
        string memory ticket_,
        uint256 effectiveTime_,
        uint64 amount_,
        bool infinite_
    ) public {
        require(msg.sender == cardMetaMap[id_].author, "It's not your card.");
        require(tickets[ticket_].tokenId == 0, "Tickets that already exist.");
        _createTicket(id_, ticket_, effectiveTime_, amount_, infinite_);
    }

    function _receiveCard(address to_, string memory ticket_) internal {
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
        ticketUsageHistory[ticket_][msg.sender] = true;
        _mint(to_, ticketMeta.tokenId, 1, "");
    }

    function receiveCard(string memory ticket_) public {
        _receiveCard(msg.sender, ticket_);
    }
}
