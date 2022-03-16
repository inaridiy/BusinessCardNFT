// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BusinessCard is ERC1155 {
    string public name = "Non Fungible Business Card";
    struct CardMeta {
        address author;
        string uri;
    }

    constructor() ERC1155("") {}
}
