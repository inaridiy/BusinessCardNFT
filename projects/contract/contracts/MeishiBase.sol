//SPDX-License-Identifier: GPL
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "./Verify.sol";

contract MeishiBase is ERC1155SupplyUpgradeable, Verify {
    string public name;
    address _signer;
    struct CardMeta {
        address author;
        string uri;
        bool isTransferable;
        bool isEditable;
    }

    mapping(uint256 => CardMeta) internal cardMetaMap;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(string memory name_, address signer_)
        public
        initializer
    {
        __ERC1155_init("");
        name = name_;
        _signer = signer_;
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
                "no transferable"
            );
        }
    }
}
