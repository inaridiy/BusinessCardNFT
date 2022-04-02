// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";

contract NameCard is ERC1155SupplyUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    string public name = "NonFungibleNameCard";
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
    mapping(address => uint256) private ownership;
    mapping(string => mapping(address => bool)) ticketUsageHistory;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() public initializer {
        __ERC1155Supply_init();
    }
}
