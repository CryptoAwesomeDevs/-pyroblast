// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

import {IPriceFeedPyroBlast} from "./interfaces/IPriceFeedPyroBlast.sol";
import {CreateOptionParams} from "./models/CreateOptionParams.sol";
import {Option, BidType, OptionStage, OptionResult, Bid, CurrentOptionInfo, BidClaimRequest} from "./models/Option.sol";
import {OptionBase} from "./OptionBase.sol";

contract OptionPyroBlast is OptionBase {

    mapping(uint256 => Option) private options;
    mapping(address => uint256[]) private userOptions;
    mapping(address => mapping(uint256 => Bid[])) private bids;

    event BetPlaced(uint256 id, address addr, uint256 amount, BidType outcome);
    event FundsWithdrawn(uint256 id, address addr, uint256 amount);

    constructor(CreateOptionParams memory params) OptionBase(params)  {}

    function currentOptionInfo() public view returns (CurrentOptionInfo memory) {
        (uint256 currentPrice, uint256 currentTimestamp) = getCurrentPrice();
        uint256 currentOptionId = getCurrentOptionId();
        uint256 prevOptionId = currentOptionId > 0 ? currentOptionId - 1 : currentOptionId;
        return CurrentOptionInfo(
            getOptionInfo(currentOptionId),
            getOptionInfo(prevOptionId),
            currentPrice,
            currentTimestamp
        );
    }

    function getOptionInfo(uint256 id) public view returns (Option memory) {
        uint256 startTs = getOptionStartTs(id);
        return Option(
            getOptionStage(id),
            resultInfo(id),
            id,
            optionName,
            tokenIn,
            tokensOut,
            address(tokenBid),
            tokenBid.symbol(),
            fee,
            startTs,
            startTs + depositPeriod,
            startTs + depositPeriod + lockPeriod,
            options[id].startPrice > 0 ? options[id].startPrice : getPrice(startTs + depositPeriod),
            options[id].closePrice > 0 ? options[id].closePrice : getPrice(startTs + depositPeriod + lockPeriod),
            options[id].upBets,
            options[id].downBets,
            options[id].upBets + options[id].downBets,
            tokenBid.decimals(),
            options[id].resolved
        );
    }

    function resultInfo(uint256 id) internal view returns (OptionResult) {
        if (options[id].resolved) {
            return options[id].result;
        }

        if (getOptionStage(id) == OptionStage.Ended) {
            uint256 startPrice = getPrice(getOptionStartTs(id) + depositPeriod);
            uint256 closePrice = getPrice(getOptionStartTs(id) + depositPeriod + lockPeriod);
            if (closePrice > startPrice) {
                return OptionResult.Up;
            }

            if (closePrice < startPrice) {
                return OptionResult.Down;
            }

            return OptionResult.NotChanged;
        }

        return OptionResult.NotEnded;
    }

    function getAllBidInfo(address addr) public view returns (Bid[] memory) {
        return batchBidInfo(addr, 0, optionsAmount(addr) - 1);
    }

    function batchBidInfo(address addr, uint256 from, uint256 to) public view returns (Bid[] memory _bids) {
        require(from <= to, "Incorrect range");
        uint256 bidCount = 0;
        uint256 _lastIndex = optionsAmount(addr) - 1;

        if (from > _lastIndex) {
            return _bids;
        }
        if (to > _lastIndex) {
            to = _lastIndex;
        }

        for (uint256 i = from; i <= to; i++) {
            uint256 optionId = userOptions[addr][i];
            bidCount += bids[addr][optionId].length;
        }

        _bids = new Bid[](bidCount);

        uint256 counter = 0;
        for (uint256 i = from; i <= to; i++) {
            uint256 optionId = userOptions[addr][i];
            Bid[] memory _optionBids = getBidInfo(addr, optionId);
            for (uint256 j = 0; j < _optionBids.length; j++) {
                _bids[counter] = _optionBids[j];
                counter++;
            }
        }
    }

    function getCurrentBidInfo(address addr) public view returns (Bid[] memory) {
        uint256 currentOptionId = getCurrentOptionId();

        Bid[] memory currOptionBids = getBidInfo(addr, currentOptionId);
        Bid[] memory prevOptionBids = currentOptionId > 0 ? getBidInfo(addr, currentOptionId - 1) : new Bid[](0);

        uint256 index = 0;
        Bid[] memory currentBidInfo = new Bid[](currOptionBids.length + prevOptionBids.length);

        for (uint256 i = currOptionBids.length; i > 0; i--) {
            currentBidInfo[index++] = currOptionBids[i - 1];
        }

        for (uint256 i = prevOptionBids.length; i > 0; i--) {
            currentBidInfo[index++] = prevOptionBids[i - 1];
        }

        return currentBidInfo;
    }

    function getBidInfo(address addr, uint256 optionId) public view returns (Bid[] memory) {
        Bid[] memory _bids = bids[addr][optionId];
        Option memory option = getOptionInfo(optionId);

        for (uint256 i = 0; i < _bids.length; i++) {
            Bid memory bid = _bids[i];
            bid.optionStage = option.optionStage;
            bid.result = option.result;
            bid.startPrice = option.startPrice;
            bid.endPrice = option.closePrice;
            bid.claimableAmount = getClaimableAmount(bid);
        }

        return _bids;
    }

    function placeBid(uint256 _bidAmount, BidType _bidType) external {
        uint256 optionId = getCurrentOptionId();
        OptionStage stage = getOptionStage(optionId);

        require(stage == OptionStage.Deposits, "Option is not started yet");
        require(_bidAmount > 0, "Bet amount must be greater than 0");


        if (
            userOptions[msg.sender].length == 0 ||
            userOptions[msg.sender][userOptions[msg.sender].length - 1] != optionId
        ) {
            userOptions[msg.sender].push(optionId);
        }

        Bid memory userBid;
        userBid.optionId = optionId;
        userBid.bidId = bids[msg.sender][optionId].length;
        userBid.bidType = _bidType;
        userBid.bidAmount = _bidAmount;
        userBid.timeStamp = block.timestamp;

        if (_bidType == BidType.Down) {
            options[optionId].downBets += _bidAmount;
        }
        if (_bidType == BidType.Up) {
            options[optionId].upBets += _bidAmount;
        }

        bids[msg.sender][optionId].push(userBid);
        emit BetPlaced(optionId, msg.sender, _bidAmount, _bidType);

        bidTokenTransfer(msg.sender, address(this), _bidAmount);
    }


    function batchClaim(BidClaimRequest[] calldata request) external {
        for (uint256 i = 0; i < request.length; i++) {
            claim(request[i]);
        }
    }

    function claim(BidClaimRequest calldata request) public {
        uint256 optionId = request.optionId;
        uint256 bidId = request.bidId;

        uint256 optionStartTs = getOptionStartTs(optionId);
        bool optionEnded = isOptionEnded(optionStartTs);
        require(optionEnded, "Option isn't ended");

        require(!bids[msg.sender][optionId][bidId].claimed, "Already claimed");
        bids[msg.sender][optionId][bidId].claimed = true;

        uint256 totalAmount = getClaimableAmount(bids[msg.sender][optionId][bidId]);
        require(totalAmount > 0, "Nothing to claim");

        emit FundsWithdrawn(optionId, msg.sender, totalAmount);


        if (!options[optionId].resolved) {
            _resolve(optionId, getPrice(optionStartTs + depositPeriod), getPrice(optionStartTs + depositPeriod + lockPeriod));
        }

        bidTokenTransfer(address(this), msg.sender, totalAmount);
    }

    function _resolve(uint256 id, uint256 startPrice, uint256 closePrice) internal {
        Option storage option = options[id];
        option.startPrice = startPrice;
        option.closePrice = closePrice;
        uint256 amountFee;
        if (option.closePrice > option.startPrice) {
            options[id].result = OptionResult.Up;
            amountFee = options[id].downBets * fee / 100;
        } else if (option.closePrice < option.startPrice) {
            options[id].result = OptionResult.Down;
            amountFee = options[id].upBets * fee / 100;
        } else {
            options[id].result = OptionResult.NotChanged;
            amountFee = 0;
        }
        option.resolved = true;
        distributeFees(amountFee);
    }

    function optionsOf(address addr) public view returns (uint256[] memory) {
        return userOptions[addr];
    }

    function optionsAmount(address addr) public view returns (uint256) {
        return userOptions[addr].length;
    }

    function getClaimableAmount(Bid memory bid) private view returns (uint256) {
        OptionResult result = resultInfo(bid.optionId);

        if (
            (result == OptionResult.Up && bid.bidType == BidType.Up) ||
            (result == OptionResult.Down && bid.bidType == BidType.Down)
        ) {
            return getPotentialEarnings(bid) + bid.bidAmount;
        }

        if (result == OptionResult.NotChanged) {
            return bid.bidAmount;
        }

        return 0;
    }

    function getPotentialEarnings(Bid memory bid) private view returns (uint256) {
        if (bid.bidType == BidType.Up && options[bid.optionId].upBets > 0) {
            return options[bid.optionId].downBets * bid.bidAmount * (100 - fee) / (options[bid.optionId].upBets * 100);
        }

        if (bid.bidType == BidType.Down && options[bid.optionId].downBets > 0) {
            return options[bid.optionId].upBets * bid.bidAmount * (100 - fee) / (options[bid.optionId].downBets * 100);
        }

        return 0;
    }

    function resolveStart(uint256 id, uint256 startPrice) external onlyOwner {
        options[id].startPrice = startPrice;
    }

    function resolveEnd(uint256 id, uint256 closePrice) external onlyOwner {
        uint256 startPrice = options[id].startPrice;
        _resolve(id, startPrice, closePrice);
    }

    function resolve(uint256 id, uint256 startPrice, uint256 closePrice) external onlyOwner {
        _resolve(id, startPrice, closePrice);
    }
}