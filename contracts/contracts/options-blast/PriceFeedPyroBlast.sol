// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.6;

import {OracleLibrary, IUniswapV3Pool} from "@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol";
import {IUniswapV3Factory} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);

    function decimals() external view returns (uint8);
}

contract PriceFeedPyroBlast {
    address public factory;
    address public owner;

    /// @notice Constructor
    /// @param factory_ address of V3 uniswap factory pools
    constructor(
        address factory_
    ) {
        factory = factory_;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not owner");
        _;
    }

    /// @notice Returns the latest price of token
    /// @param tokenIn token for which we are requesting a price 
    /// @param tokenOut token in which we request a price
    /// @param amountIn 1 * 10 ** decimals 
    /// @param secondsAgo price for 10 seconds ago
    /// @param _fee fee of pool
    /// @return amountOut price of tokenIn 
    function estimateAmountOut(
        address tokenIn,
        address tokenOut,
        uint128 amountIn,
        uint32 secondsAgo,
        uint24 _fee
    ) public view returns (uint256 amountOut) {

        require(tokenIn != tokenOut, "invalid token");

        address _pool = IUniswapV3Factory(factory).getPool(
            tokenIn,
            tokenOut,
            _fee
        );
        require(_pool != address(0), "pool doesn't exist");


        uint32[] memory secondsAgos = new uint32[](2);
        secondsAgos[0] = secondsAgo;
        secondsAgos[1] = 0;

        (int56[] memory tickCumulatives,) = IUniswapV3Pool(_pool).observe(
            secondsAgos
        );

        int56 tickCumulativesDelta = tickCumulatives[1] - tickCumulatives[0];

        int24 tick = int24(tickCumulativesDelta / secondsAgo);

        if (
            tickCumulativesDelta < 0 && (tickCumulativesDelta % secondsAgo != 0)
        ) {
            tick--;
        }

        amountOut = uint256(OracleLibrary.getQuoteAtTick(
                tick,
                amountIn,
                tokenIn,
                tokenOut
            ));
    }

    struct Mixin {
        uint256 price;
        address pool;
        uint256 tokenInBalance;
        uint256 tokenOutBalance;
    }

    function getPrice(address tokenIn, address[] calldata tokensOut, uint24[] calldata poolFees, uint32 secondsAgo) external view returns (uint256 totalPrice) {
        uint256 _size = tokensOut.length;
        Mixin[] memory mixin = new Mixin[](_size);
        uint256 liquidity;
        for (uint256 i = 0; i < _size; i++) {
            mixin[i] = getMixin(tokenIn, tokensOut[i], uint128(10 ** IERC20(tokenIn).decimals()), secondsAgo, poolFees[i]);
            liquidity += mixin[i].price * mixin[i].tokenInBalance + mixin[i].tokenOutBalance;
            mixin[i].tokenOutBalance = mixin[i].price * mixin[i].tokenInBalance + mixin[i].tokenOutBalance;
        }
        for (uint256 i = 0; i < _size; i++) {
            totalPrice += (mixin[i].price * mixin[i].tokenOutBalance) / liquidity;
        }

        return totalPrice;
    }

    function getMixin(
        address tokenIn,
        address tokenOut,
        uint128 amountIn,
        uint32 secondsAgo,
        uint24 _fee
    ) internal view returns (Mixin memory) {
        uint256 price = convertDecimalsToIn(tokenIn, tokenOut, estimateAmountOut(tokenIn, tokenOut, amountIn, secondsAgo, _fee));
        address pool = IUniswapV3Factory(factory).getPool(tokenIn, tokenOut, _fee);
        uint256 tokenInBalance = IERC20(tokenIn).balanceOf(pool);
        uint256 tokenOutBalance = convertDecimalsToIn(tokenIn, tokenOut, IERC20(tokenOut).balanceOf(pool));

        return Mixin(price, pool, tokenInBalance, tokenOutBalance);
    }

    function convertDecimalsToIn(address tokenIn, address tokenOut, uint256 price) internal view returns (uint256) {
        uint256 decimalsOut = IERC20(tokenOut).decimals();
        uint256 decimalsIn = IERC20(tokenIn).decimals();
        return decimalsOut <= decimalsIn ? price *= 10 ** (decimalsIn - decimalsOut) : price /= 10 ** (decimalsOut - decimalsIn);
    }

    /// @notice Set factory address
    /// @param _newAddress new factory address
    function setFactory(address _newAddress) external onlyOwner {
        factory = _newAddress;
    }

    /// @notice Get factory address
    /// @return factory factory address
    function getFactory() external view returns (address){
        return factory;
    }
}