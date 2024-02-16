import { useAccount, useContractRead } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import { BasicTokenAbi } from 'app/web3/contracts/BasicToken';
import { useOptionsStore } from 'app/store';

export const useBiddingTokenBalance = () => {
  const { address, isConnected } = useAccount();
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);

  const {
    data: balance = BigNumber.from(0),
    refetch,
    isFetched,
    isFetchedAfterMount,
  } = useContractRead({
    abi: BasicTokenAbi,
    address: selectedOptionInfo.bidToken,
    functionName: 'balanceOf',
    args: [address ?? AddressZero],
    enabled: isConnected && selectedOptionInfo.isLoaded,
  });

  const formattedBalanceNum = parseFloat(ethers.utils.formatEther(balance));
  const formattedBalance = formattedBalanceNum.toFixed(2);

  return {
    isFetchedAfterMount,
    address: selectedOptionInfo.bidToken,
    name: selectedOptionInfo.bidTokenName,
    isFetched,
    balance,
    formattedBalance,
    formattedBalanceNum,
    refetch,
  };
};
