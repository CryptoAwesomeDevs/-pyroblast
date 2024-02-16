// SPDX-License-Identifier:  GPL-3.0
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {CreateOptionParams, FeeKeeper} from "./models/CreateOptionParams.sol";
import {IPriceFeedPyroBlast} from "./interfaces/IPriceFeedPyroBlast.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {OptionStage} from "./models/Option.sol";

interface IBlast {
  function configureClaimableGas() external;
  function claimAllGas(address contractAddress, address recipient) external returns (uint256);
}

contract OptionBase is Ownable {
    IBlast public constant BLAST = IBlast(0x4300000000000000000000000000000000000002);
    IPriceFeedPyroBlast internal priceFeed;
    IERC20Metadata internal tokenBid;

    bool public isStarted;

    uint256 public startTimestamp; // start of deposit phase of 0 option
    uint256 public depositPeriod;
    uint256 public lockPeriod;

    address internal tokenIn;
    uint256 internal fee;
    uint256 internal optionDuration;

    FeeKeeper[] internal feeKeepers;
    address[] internal tokensOut;
    uint24[] internal poolFees;
    string internal optionName;

    constructor(CreateOptionParams memory params){
        BLAST.configureClaimableGas(); 

        priceFeed = IPriceFeedPyroBlast(params.feed);
        tokenBid = IERC20Metadata(params.tokenBid);

        startTimestamp = params.startTimestamp;
        depositPeriod = params.depositPeriod;
        lockPeriod = params.lockPeriod;

        tokenIn = params.tokenIn;

        uint256 total = 0;
        for (uint256 i = 0; i < params.feeKeepers.length; i++) {
            total += params.feeKeepers[i].permil;
            feeKeepers.push(params.feeKeepers[i]);
        }
        require(total == 1000, "Total permil is invalid");

        fee = params.fee;
        optionDuration = depositPeriod + lockPeriod;

        tokensOut = params.tokensOut;
        poolFees = params.poolFees;

        optionName = params.name;
    }

    function getCurrentOptionId() public view returns (uint256) {
        if (startTimestamp + depositPeriod >= block.timestamp) {
            return 0;
        }
        return 1 + (block.timestamp - startTimestamp - depositPeriod) / lockPeriod;
    }

    function getCurrentPrice() public view returns (uint256, uint256) {
        uint256 ts = block.timestamp - 1;
        return (getPrice(ts), ts);
    }

    function currentOptionTimestamp() public view returns (uint256) {
        return getOptionStartTs(getCurrentOptionId());
    }

    function bidTokenTransfer(address from, address to, uint256 amount) internal {
        if (amount == 0) {
            return;
        }
        bool sent = from == address(this) ? tokenBid.transfer(to, amount) : tokenBid.transferFrom(from, to, amount);
        require(sent, "TransferFrom Error");
        claimGas();
    }

    function claimGas() private {
        BLAST.claimAllGas(address(this), msg.sender);
    }

    function distributeFees(uint256 amount) internal {
        for (uint256 i = 0; i < feeKeepers.length; i++) {
            bidTokenTransfer(address(this), feeKeepers[i].addr, amount * feeKeepers[i].permil / 1000);
        }
    }

    function getOptionStage(uint256 id) internal view returns (OptionStage) {
        if (!isStarted) {
            return OptionStage.Closed;
        }
        uint256 optionStartTs = getOptionStartTs(id);
        if (block.timestamp < optionStartTs) {
            return OptionStage.NotStarted;
        }
        if (isOptionEnded(optionStartTs)) {
            return OptionStage.Ended;
        }
        if (block.timestamp >= optionStartTs + depositPeriod) {
            return OptionStage.Lock;
        }
        return OptionStage.Deposits;
    }

    function isOptionEnded(uint256 optionStartTs) internal view returns (bool) {
        return block.timestamp > optionStartTs + depositPeriod + lockPeriod;
    }


    function getOptionStartTs(uint256 id) internal view returns (uint256) {
        return startTimestamp + lockPeriod * id;
    }

    function getPrice(uint256 timeStamp) internal view returns (uint256) {
        if (timeStamp >= block.timestamp) {
            return 0;
        }
        return priceFeed.getPrice(tokenIn, tokensOut, poolFees, uint32(block.timestamp - timeStamp));
    }

    function toggleOption() external onlyOwner {
        isStarted = !isStarted;
    }

    function setPyroBlastFeed(IPriceFeedPyroBlast newPyroBlastFeed) external onlyOwner {
        priceFeed = newPyroBlastFeed;
    }

    function setOptionName(string calldata newOptionName) external onlyOwner {
        optionName = newOptionName;
    }

    function setTokenIn(address newAddress) external onlyOwner {
        tokenIn = newAddress;
    }

    function setTokensOut(address[] calldata newTokensOut) external onlyOwner {
        tokensOut = newTokensOut;
    }

    function setPoolFees(uint24[] calldata newPoolFees) external onlyOwner {
        poolFees = newPoolFees;
    }

    function setFeeKeepers(FeeKeeper[] calldata newFeeKeepers) external onlyOwner {
        uint256 total = 0;
        for (uint256 i = 0; i < newFeeKeepers.length; i++) {
            total += newFeeKeepers[i].permil;
        }

        require(total == 1000, "Total permil is invalid");

        if (feeKeepers.length > 0) {
            delete feeKeepers;
        }

        for (uint256 i = 0; i < newFeeKeepers.length; i++) {
            feeKeepers.push(newFeeKeepers[i]);
        }
    }

    function setFee(uint256 newFee) external onlyOwner {
        fee = newFee;
    }

    function setStartTimestamp(uint256 newStartTimestamp) external onlyOwner {
        startTimestamp = newStartTimestamp;
    }

    function setDepositPeriod(uint256 newDepositPeriod) external onlyOwner {
        depositPeriod = newDepositPeriod;
    }

    function setLockPeriod(uint256 newLockPeriod) external onlyOwner {
        lockPeriod = newLockPeriod;
    }
}
