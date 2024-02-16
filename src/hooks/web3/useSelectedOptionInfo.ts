import { useContractRead, useQuery } from 'wagmi';
import { OptionABI } from 'app/web3/contracts/OptionAbi';
import { BigNumber, ethers } from 'ethers';
import { useOptionsStore } from 'app/store';
import { type ReadContractResult } from '@wagmi/core';
import { type OptionInfo } from 'app/types';
import { getPayout, ONE_ETHER } from 'app/utils/math';
import axios from 'axios';

export const useSelectedOptionInfo = () => {
  const selectedOption = useOptionsStore((state) => state.selectedOption);
  const setSelectedOptionInfo = useOptionsStore((state) => state.setSelectedOptionInfo);
  const setSelectedOptionPrevInfo = useOptionsStore((state) => state.setSelectedOptionPrevInfo);
  const addSelectedOptionPriceData = useOptionsStore((state) => state.addSelectedOptionPriceData);
  const setSelectedOptionPriceData = useOptionsStore((state) => state.setSelectedOptionPriceData);

  const transformOptionInfo = (
    data: ReadContractResult<typeof OptionABI, 'currentOptionInfo'>['currentRound']
  ): OptionInfo => {
    const decimals = data.decimals;
    const upPayout = getPayout(ONE_ETHER, data.upBets, data.downBets, data.fee);
    const downPayout = getPayout(ONE_ETHER, data.downBets, data.upBets, data.fee);

    return {
      id: data.optionIndex.toNumber(),
      name: selectedOption?.name ?? '',
      isLoaded: true,
      address: selectedOption?.address ?? ethers.constants.AddressZero,
      decimals,
      totalPool: data.totalBets,
      totalPoolFormatted: ethers.utils.formatUnits(data.totalBets, decimals),
      stage: data.optionStage,
      bidTokenName: data.tokenBidName,
      bidToken: data.tokenBid,
      optionStart: data.startTs.toNumber(),
      lockStart: data.lockTs.toNumber(),
      optionEnd: data.endTs.toNumber(),
      up: (parseFloat(upPayout) + 1).toFixed(2),
      down: (parseFloat(downPayout) + 1).toFixed(2),
      fee: data.fee,
      upBets: data.upBets,
      downBets: data.downBets,
      startPrice: data.startPrice,
      closePrice: data.closePrice,
    };
  };

  useQuery(
    ['fetch-price-history', selectedOption?.address],
    () =>
      axios.get('/api/price/historical-testnet', {
        params: { address: selectedOption?.address, from: new Date(Date.now() - 3600000), to: new Date() },
      }),
    {
      refetchOnWindowFocus: false,
      enabled: !!selectedOption?.address,
      onSuccess: (data) => {
        setSelectedOptionPriceData(
          data.data.prices.map((i: { price: string; timestamp: string }) => ({
            price: parseFloat(ethers.utils.formatEther(BigNumber.from(i.price))),
            time: new Date(i.timestamp).getTime() / 1000,
          }))
        );
      },
    }
  );

  const { refetch } = useQuery(
    ['fetch-current-price', selectedOption?.address],
    () =>
      axios.get('/api/price/last-testnet', {
        params: { address: selectedOption?.address },
      }),
    {
      enabled: !!selectedOption?.address,
      onSuccess: (data) => {
        addSelectedOptionPriceData({
          price: parseFloat(ethers.utils.formatEther(data.data.price)),
          time: Math.floor(new Date(data.data.timestamp).getTime() / 1000),
        });
      },
      onError: () => {
        addSelectedOptionPriceData({
          price: 0,
          time: Math.floor(new Date().getTime() / 1000),
        });
      },
    }
  );

  return useContractRead({
    address: selectedOption?.address,
    abi: OptionABI,
    functionName: 'currentOptionInfo',
    enabled: !!selectedOption,

    select: (data) => {
      const currentRound = transformOptionInfo(data.currentRound);
      const prevRound = transformOptionInfo(data.prevRound);
      return {
        currentRound,
        prevRound,
      };
    },
    onSuccess: async (data) => {
      setSelectedOptionInfo(data.currentRound);
      setSelectedOptionPrevInfo(data.prevRound);
      await refetch();
    },
  });
};
