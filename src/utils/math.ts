import { BigNumber, ethers } from 'ethers';
import { BidType, type OptionInfo } from 'app/types';

export const ONE_ETHER = ethers.utils.parseEther('1');
export const roundTo = (num: number | string, decimals: number) => +(+num).toFixed(decimals);
const oneIfZero = (num: BigNumber) => (num.eq(0) ? ONE_ETHER : num);

export const getPayout = (amount: BigNumber, first: BigNumber, second: BigNumber, fee: BigNumber) =>
  ethers.utils.formatEther(amount.mul(second).div(oneIfZero(first)).mul(BigNumber.from(100).sub(fee)).div(100));

export const getPotentialWin = (bidType: BidType, betAmount: BigNumber, optionInfo: OptionInfo) => {
  return bidType === BidType.UP
    ? getPayout(betAmount, optionInfo.upBets.add(betAmount), optionInfo.downBets, optionInfo.fee)
    : getPayout(betAmount, optionInfo.downBets.add(betAmount), optionInfo.upBets, optionInfo.fee);
};
