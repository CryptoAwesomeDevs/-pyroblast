import { useOptionsStore } from 'app/store';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { BasicTokenAbi } from 'app/web3/contracts/BasicToken';
import { ethers } from 'ethers';
import { useTransactionState } from 'app/hooks/logic/useTransactionState';
import { useTracking } from 'app/hooks/ui/useTracking';

export const useBiddingTokenAllowance = (amount: number) => {
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const { address, isConnected } = useAccount();
  const formattedAmount = ethers.utils.parseEther(amount.toString());
  const state = useTransactionState();
  const trackApprove = useTracking('Approve');

  const { data: isAllowed = false, refetch: refetchIsAllowed } = useContractRead({
    address: selectedOptionInfo.bidToken,
    abi: BasicTokenAbi,
    functionName: 'allowance',
    args: address && selectedOptionInfo.isLoaded ? [address, selectedOptionInfo.address] : undefined,
    enabled: amount > 0 && !!address && selectedOptionInfo.isLoaded,
    select: (data) => data.gte(formattedAmount),
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: selectedOptionInfo.bidToken,
    abi: BasicTokenAbi,
    functionName: 'approve',
    args: selectedOptionInfo.isLoaded ? [selectedOptionInfo.address, formattedAmount] : undefined,
    enabled: isConnected && amount > 0 && !!address && selectedOptionInfo.isLoaded && !isAllowed,
  });

  const { data: approveData, write: approve, reset } = useContractWrite(approveConfig);

  const { isLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    enabled: !!approveData?.hash,
    onSuccess: async () => {
      await refetchIsAllowed();
      trackApprove({
        data: { tokenAddress: selectedOptionInfo.bidToken, amount, optionAddress: selectedOptionInfo.address },
      });
      await reset();
    },
    onError: async () => {
      state.setError();
      trackApprove({
        data: { tokenAddress: selectedOptionInfo.bidToken, amount, optionAddress: selectedOptionInfo.address },
      });
      await reset();
    },
  });

  return {
    isAllowed,
    state,
    tx: approveData?.hash,
    approve,
    isLoading,
  };
};
