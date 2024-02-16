import { useOptionsStore } from 'app/store';
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { OptionABI } from 'app/web3/contracts/OptionAbi';
import { BidType, OptionStage } from 'app/types';
import { useBiddingTokenBalance } from 'app/hooks/web3/useBiddingTokenBalance';
import { HistoryType, useOptionHistory } from 'app/hooks/web3/useOptionHistory';
import { useTransactionState } from 'app/hooks/logic/useTransactionState';
import { useTracking } from 'app/hooks/ui/useTracking';

export const useOptionBid = (amount: number, enabled: boolean) => {
  const { isConnected } = useAccount();
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const formattedAmount = ethers.utils.parseEther(amount.toString());
  const { refetch: refetchBalance } = useBiddingTokenBalance();

  const trackBid = useTracking('Place bid');
  const trackBidError = useTracking('Bid error');

  const {
    currentOptions: { refetch: refetchHistory },
  } = useOptionHistory(HistoryType.ACTIVE);
  const state = useTransactionState();

  const { config: placeBidUpConfig, refetch: refetchUpConfig } = usePrepareContractWrite({
    address: selectedOptionInfo.address,
    abi: OptionABI,
    functionName: 'placeBid',
    args: [formattedAmount, BidType.UP],
    enabled:
      isConnected &&
      amount > 0 &&
      selectedOptionInfo.isLoaded &&
      enabled &&
      selectedOptionInfo.stage === OptionStage.DEPOSIT,
  });

  const { config: placeBidDownConfig, refetch: refetchDownConfig } = usePrepareContractWrite({
    address: selectedOptionInfo.address,
    abi: OptionABI,
    functionName: 'placeBid',
    args: [formattedAmount, BidType.DOWN],
    enabled:
      isConnected &&
      amount > 0 &&
      selectedOptionInfo.isLoaded &&
      enabled &&
      selectedOptionInfo.stage === OptionStage.DEPOSIT,
  });

  const { data: placeBidUpData, write: placebidUp, reset: resetPlaceBidUp } = useContractWrite(placeBidUpConfig);
  const {
    data: placeBidDownData,
    write: placebidDown,
    reset: resetPlaceBidDown,
  } = useContractWrite(placeBidDownConfig);

  const refetchOnBid = async () => {
    await Promise.all([refetchBalance(), refetchUpConfig(), refetchDownConfig(), refetchHistory()]);
  };

  const { isLoading: upLoading } = useWaitForTransaction({
    hash: placeBidUpData?.hash,
    enabled: !!placeBidUpData?.hash,
    onSuccess: async () => {
      trackBid({
        data: { direction: 'UP', amount, optionId: selectedOptionInfo.id, optionAddress: selectedOptionInfo.address },
      });
      await refetchOnBid();
      await resetPlaceBidUp();
    },
    onError: async (error) => {
      state.setError();
      trackBidError({
        data: {
          direction: 'UP',
          amount,
          optionId: selectedOptionInfo.id,
          optionAddress: selectedOptionInfo.address,
          error: error.message,
        },
      });
      await resetPlaceBidUp();
    },
  });

  const { isLoading: downLoading } = useWaitForTransaction({
    hash: placeBidDownData?.hash,
    enabled: !!placeBidDownData?.hash,
    onSuccess: async () => {
      trackBid({
        data: { direction: 'DOWN', amount, optionId: selectedOptionInfo.id, optionAddress: selectedOptionInfo.address },
      });
      await refetchOnBid();
      await resetPlaceBidDown();
    },
    onError: async (error) => {
      state.setError();
      trackBidError({
        data: {
          direction: 'DOWN',
          amount,
          optionId: selectedOptionInfo.id,
          optionAddress: selectedOptionInfo.address,
          error: error.message,
        },
      });
      await resetPlaceBidDown();
    },
  });

  return {
    placebidUp,
    placebidDown,
    state,
    isLoading: upLoading || downLoading,
  };
};
