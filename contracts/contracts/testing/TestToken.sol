// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, Ownable {

    uint256 private AMOUNT = 1000 ether;
    mapping(address => bool) public minted;
    mapping(address => bool) public transferAllowed;

    constructor() ERC20("USDT", "USDT") {
    }

    function mint() external {
        address minter = _msgSender();
        require(!minted[minter], "Already minted");
        minted[minter] = true;
        _mint(minter, AMOUNT);
    }

    function transfer(address to, uint256 amount) public override(ERC20) returns (bool) {
        require(transferAllowed[_msgSender()], "Transfer not allowed");
        return super.transfer(to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override(ERC20) returns (bool) {
        require(transferAllowed[_msgSender()], "Transfer not allowed");
        return super.transferFrom(from, to, amount);
    }

    function addAllowedAddress(address addr) external onlyOwner {
        transferAllowed[addr] = true;
    }
}
