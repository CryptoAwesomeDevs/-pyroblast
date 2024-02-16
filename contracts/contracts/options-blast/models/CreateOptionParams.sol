// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

    struct FeeKeeper {
        address addr;
        uint256 permil;
    }

    struct CreateOptionParams {
        address feed;
        string name;
        address tokenIn;
        address[] tokensOut;
        uint24[] poolFees;
        address tokenBid;
        FeeKeeper[] feeKeepers;
        uint256 fee;
        uint256 startTimestamp;
        uint256 depositPeriod;
        uint256 lockPeriod;
    }