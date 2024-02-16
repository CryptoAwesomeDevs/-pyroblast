// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;


interface IPriceFeedPyroBlast {
    function estimateAmountOut(
        address tokenIn,
        address tokenOut,
        uint128 amountIn,
        uint32 secondsAgo,
        uint24 _fee
    ) external view returns (uint256 amountOut);

    function getPrice(address tokenIn, address[] calldata tokensOut, uint24[] calldata poolFees, uint32 secondsAgo) external view returns (uint256);
}