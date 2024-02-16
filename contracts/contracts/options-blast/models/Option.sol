// SPDX-License-Identifier:  GPL-3.0
pragma solidity ^0.8.13;


    enum OptionStage {
        NotStarted,
        Deposits,
        Lock,
        Ended,
        Closed
    }

    enum OptionResult {
        NoResult,
        Down,
        Up,
        NotChanged,
        NotEnded
    }

    enum BidType {
        Down,
        Up
    }


    struct Option {
        OptionStage optionStage;
        OptionResult result;
        uint256 optionIndex;
        string optionName;
        address tokenIn;
        address[] tokensOut;
        address tokenBid;
        string tokenBidName;
        uint256 fee;
        uint256 startTs;
        uint256 lockTs;
        uint256 endTs;
        uint256 startPrice;
        uint256 closePrice;
        uint256 upBets;
        uint256 downBets;
        uint256 totalBets;
        uint8 decimals;
        bool resolved;
    }

    struct Bid {
        uint256 optionId;
        uint256 bidId;

        OptionStage optionStage;
        OptionResult result;
        BidType bidType;

        uint256 bidAmount;
        uint256 timeStamp;
        uint256 claimableAmount;
        uint256 startPrice;
        uint256 endPrice;

        bool claimed;
    }

    struct BidClaimRequest {
        uint256 optionId;
        uint256 bidId;
    }

    struct CurrentOptionInfo {
        Option currentRound;
        Option prevRound;
        uint256 currentPrice;
        uint256 currentTimestamp;
    }