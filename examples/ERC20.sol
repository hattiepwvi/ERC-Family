// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MyToken is ERC20Burnable {
    constructor() ERC20("DefaultTokenName", "DTN") {
        uint256 initialSupply = 1_000_000 * (10 ** 18);

        _mint(msg.sender, initialSupply);
    }
}
