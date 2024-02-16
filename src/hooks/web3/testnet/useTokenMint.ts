import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { BasicTokenAbi } from 'app/web3/contracts/BasicToken';
import { useTransactionState } from 'app/hooks/logic/useTransactionState';
import { useBiddingTokenBalance } from 'app/hooks/web3/useBiddingTokenBalance';
import { AddressZero } from '@ethersproject/constants';

export const useTokenMint = () => {
  const { address, isConnected } = useAccount();

  const { refetch, address: tokenAddress } = useBiddingTokenBalance();

  const { data: isMinted = false, refetch: refetchMinted } = useContractRead({
    address: tokenAddress,
    abi: BasicTokenAbi,
    functionName: 'minted',
    args: [address ?? AddressZero],
    enabled: isConnected && !!address && tokenAddress !== AddressZero,
  });
  const state = useTransactionState();
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: BasicTokenAbi,
    functionName: 'mint',
    enabled: isConnected && !isMinted,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data?.hash,
    onSuccess: async () => {
      state.setSuccess();
      await refetch();
      await refetchMinted();
    },
    onError: state.setError,
  });

  return {
    ...state,
    isLoading,
    isMinted,
    write,
  };
};
