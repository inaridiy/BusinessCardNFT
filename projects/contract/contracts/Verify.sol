// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

contract Verify {
    using ECDSAUpgradeable for bytes32;

    function _recover(string memory message_, bytes memory signature_)
        public
        pure
        returns (address)
    {
        return
            keccak256(abi.encodePacked(message_))
                .toEthSignedMessageHash()
                .recover(signature_);
    }

    function _verify(
        string memory message_,
        bytes memory signature_,
        address singer_
    ) public pure returns (bool) {
        return singer_ == _recover(message_, signature_);
    }

    modifier verify(
        string memory uri_,
        bytes memory signature_,
        address singer_
    ) {
        require(_verify(uri_, signature_, singer_), "Signature is incorrect.");
        _;
    }
}
