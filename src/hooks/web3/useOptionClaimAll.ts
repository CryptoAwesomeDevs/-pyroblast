import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { OptionABI } from 'app/web3/contracts/OptionAbi';
import { useOptionsStore } from 'app/store';
import { BigNumber } from 'ethers';
import { useBiddingTokenBalance } from 'app/hooks/web3/useBiddingTokenBalance';
import { HistoryType, useOptionHistory } from 'app/hooks/web3/useOptionHistory';
import { useTracking } from 'app/hooks/ui/useTracking';

export const useOptionClaimAll = (enabled = true) => {
  const bidHistory = useOptionsStore((state) => state.endedBidHistory);
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const ids = bidHistory
    .filter((i) => !i.isClaimed && i.isWon)
    .map((i) => ({ optionId: BigNumber.from(i.optionId), bidId: BigNumber.from(i.bidId) }));

  const { refetch: refetchBalance } = useBiddingTokenBalance();
  const {
    endedOptions: { refetch: refetchHistory },
  } = useOptionHistory(HistoryType.FINISHED);

  const trackClaim = useTracking('Claim all bets');

  const { config } = usePrepareContractWrite({
    address: selectedOptionInfo.address,
    abi: OptionABI,
    functionName: 'batchClaim',
    args: [ids],
    enabled: ids.length > 0 && enabled,
  });

  const { data: claimData, write: claimAll } = useContractWrite(config);

  useWaitForTransaction({
    hash: claimData?.hash,
    enabled: !!claimData?.hash,
    onSuccess: async () => {
      trackClaim({ data: { optionIds: ids } });

      await refetchBalance();
      await refetchHistory();
    },
  });

  return {
    hasUnclaimedBids: ids.length > 0,
    claimAll,
  };
};
