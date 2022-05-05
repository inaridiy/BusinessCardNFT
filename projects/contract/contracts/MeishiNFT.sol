//SPDX-License-Identifier: GPL
pragma solidity ^0.8.4;

import "./MeishiTicketFactory.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract MeishiNFT is MeishiTicketFactory {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    function createdTickets(address creater_, bytes memory signature_)
        public
        view
        verify("getTicket", signature_, creater_)
        returns (string[] memory)
    {
        return ticketsOwner[creater_];
    }

    function createdIds(address creater_)
        public
        view
        returns (uint256[] memory)
    {
        uint256 uriCount;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (cardMetaMap[i].author == creater_) {
                uriCount++;
            }
        }
        uint256[] memory ids = new uint256[](uriCount);
        uint256 hitUriCount;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (cardMetaMap[i].author == creater_) {
                ids[hitUriCount] = i;
                hitUriCount++;
            }
        }
        return ids;
    }

    function collcted(address owner_) public view returns (uint256[] memory) {
        uint256 uriCount;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (balanceOf(owner_, i) > 0) {
                uriCount++;
            }
        }
        uint256[] memory ids = new uint256[](uriCount);
        uint256 hitUriCount;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (balanceOf(owner_, i) > 0) {
                ids[hitUriCount] = i;
                hitUriCount++;
            }
        }
        return ids;
    }
}
