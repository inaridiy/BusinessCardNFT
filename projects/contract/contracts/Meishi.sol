//SPDX-License-Identifier: GPL
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";

contract Meishi is ERC1155SupplyUpgradeable {
    string public name = "NFT Meishi";
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

    mapping(uint256 => CardMeta) cardMetaMap;
    mapping(string => TicketMeta) tickets;
    mapping(string => mapping(address => bool)) ticketUsageHistory;
    mapping(address => string[]) ticketsOwner;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        __ERC1155_init("");
    }
}
