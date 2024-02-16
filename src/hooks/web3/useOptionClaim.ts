import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { OptionABI } from 'app/web3/contracts/OptionAbi';
import { useOptionsStore } from 'app/store';
import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useBiddingTokenBalance } from 'app/hooks/web3/useBiddingTokenBalance';
import { HistoryType, useOptionHistory } from 'app/hooks/web3/useOptionHistory';
import { useTracking } from 'app/hooks/ui/useTracking';

export const useOptionClaim = () => {
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const { refetch: refetchBalance } = useBiddingTokenBalance();
  const {
    endedOptions: { refetch: refetchHistory },
  } = useOptionHistory(HistoryType.FINISHED);

  const trackClaim = useTracking('Claim bet');

  const { data: claimData, write: claimWrite } = useContractWrite({
    address: selectedOptionInfo.address,
    abi: OptionABI,
    functionName: 'claim',
    mode: 'recklesslyUnprepared',
  });

  useWaitForTransaction({
    hash: claimData?.hash,
    enabled: !!claimData?.hash,
    onSuccess: async () => {
      await refetchBalance();
      await refetchHistory();
    },
  });

  const claim = useCallback(
    (optionId: number, bidId: number) => {
      claimWrite({
        recklesslySetUnpreparedArgs: [
          {
            optionId: BigNumber.from(optionId),
            bidId: BigNumber.from(bidId),
          },
        ],
      });
      trackClaim({ data: { optionId, bidId } });
    },
    [claimWrite, trackClaim]
  );

  return {
    claim,
  };
};
