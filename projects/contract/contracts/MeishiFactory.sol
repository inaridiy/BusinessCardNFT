//SPDX-License-Identifier: GPL
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./MeishiBase.sol";

contract MeishiFactory is MeishiBase {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter _tokenIds;

    function _print(
        address printer_,
        string memory uri_,
        bool isTransferable_,
        bool isEditable_
    ) internal {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        cardMetaMap[newItemId] = CardMeta(
            printer_,
            uri_,
            isTransferable_,
            isEditable_
        );
        _mint(printer_, newItemId, 1, ""); //一枚だけmintしておく
    }

    function print(
        string memory uri_,
        bytes memory signature_,
        bool isTransferable_,
        bool isEditable_
    ) public verify(uri_, signature_, _signer) {
        _print(msg.sender, uri_, isTransferable_, isEditable_);
    }

    function _edit(uint256 id_, string memory uri_) internal {
        CardMeta storage cardMeta = cardMetaMap[id_];
        require(cardMeta.isEditable, "Editing is not permitted.");
        emit URI(uri_, id_);
        cardMeta.uri = uri_;
    }

    function edit(
        uint256 id_,
        string memory uri_,
        bytes memory signature_
    ) public verify(uri_, signature_, _signer) {
        require(cardMetaMap[id_].author == msg.sender, "It's not your card.");
        _edit(id_, uri_);
    }
}
