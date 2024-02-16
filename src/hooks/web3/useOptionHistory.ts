import { useAccount, useContractRead } from 'wagmi';
import { useOptionsStore } from 'app/store';
import { OptionABI } from 'app/web3/contracts/OptionAbi';
import { BigNumber, ethers } from 'ethers';
import { BidHistory, OptionStage } from 'app/types';
import { ReadContractResult } from '@wagmi/core';
import { getPotentialWin } from 'app/utils/math';

export enum HistoryType {
  ACTIVE,
  FINISHED,
}

export const useOptionHistory = (type: HistoryType) => {
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const selectedOptionPrevInfo = useOptionsStore((state) => state.selectedOptionPrevInfo);
  const setBidHistory = useOptionsStore((state) => state.setBidHistory);
  const setEndedBidHistory = useOptionsStore((state) => state.setEndedBidHistory);

  const { address, isConnected } = useAccount();
  const transformBidHistory = (
    data: ReadContractResult<typeof OptionABI, 'getCurrentBidInfo'>[number]
  ): BidHistory => {
    const isFinished = data.optionStage === OptionStage.Ended;
    const isWon = isFinished && (data.claimableAmount.gt(0) || data.result === 2);
    const amount = ethers.utils.formatEther(data.bidAmount);
    let potentialWin;
    if (selectedOptionInfo.id === data.optionId.toNumber()) {
      potentialWin = getPotentialWin(data.bidType, data.bidAmount, selectedOptionInfo);
    } else {
      potentialWin = getPotentialWin(data.bidType, data.bidAmount, selectedOptionPrevInfo);
    }

    const potentialWinSum = parseFloat(potentialWin) + parseFloat(amount);

    return {
      optionId: data.optionId.toNumber(),
      bidId: data.bidId.toNumber(),
      date: data.timeStamp.toNumber() * 1000,
      amount: ethers.utils.formatEther(data.bidAmount),
      direction: data.bidType,
      isClaimed: data.claimed,
      isWon,
      isFinished,
      betResult: isFinished ? (isWon ? ethers.utils.formatEther(data.claimableAmount) : '-' + amount) : '',
      pair: selectedOptionInfo.name,
      potentialWin: potentialWinSum.toString(),
    };
  };

  const { data: optionsAmount, isFetched: optionsAmountFetched } = useContractRead({
    address: selectedOptionInfo.address,
    abi: OptionABI,
    functionName: 'optionsAmount',
    args: [address ?? ethers.constants.AddressZero],
    enabled: selectedOptionInfo.isLoaded && isConnected && type === HistoryType.FINISHED,
  });

  const endedOptions = useContractRead({
    abi: OptionABI,
    address: selectedOptionInfo.address,
    functionName: 'batchBidInfo',
    args: [address ?? ethers.constants.AddressZero, BigNumber.from(0), BigNumber.from(optionsAmount ?? 1)],
    select: (data) =>
      data
        .map(transformBidHistory)
        .filter((i) => i.isFinished)
        .sort((a, b) => b.optionId - a.optionId),
    onSuccess: setEndedBidHistory,
    enabled: selectedOptionInfo.isLoaded && isConnected && type === HistoryType.FINISHED && optionsAmountFetched,
  });

  const currentOptions = useContractRead({
    address: selectedOptionInfo.address,
    abi: OptionABI,
    functionName: 'getCurrentBidInfo',
    args: [address ?? ethers.constants.AddressZero],
    enabled: selectedOptionInfo.isLoaded && isConnected && type === HistoryType.ACTIVE,
    select: (data) => data.map(transformBidHistory),
    onSuccess: setBidHistory,
  });

  return {
    endedOptions,
    currentOptions,
  };
};
