import { useContractRead } from 'wagmi';
import { config } from 'app/config';
import { FactoryABI } from 'app/web3/contracts/FactoryAbi';
import { BigNumber } from 'ethers';
import { Option } from 'app/types';
import { useOptionsStore } from 'app/store';

export const useAvailableOptions = () => {
  const setAvailableOptions = useOptionsStore((state) => state.setAvailableOptions);
  const availableOptionsRange = useOptionsStore((state) => state.availableOptionsRange);

  return useContractRead({
    address: config.factoryAddress,
    abi: FactoryABI,
    functionName: 'listOptions',
    args: [BigNumber.from(availableOptionsRange.from), BigNumber.from(availableOptionsRange.to)],
    select: (data): Option[] => data.options.map((i) => ({ address: i.optionAddress, name: i.optionName })),
    onSuccess: setAvailableOptions,
  });
};
