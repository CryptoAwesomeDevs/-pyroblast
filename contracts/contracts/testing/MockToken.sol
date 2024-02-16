// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockToken is ERC20, Ownable {

    constructor(uint256 amount_) ERC20("USDT", "USDT") {
        _mint(msg.sender, amount_);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }
}
