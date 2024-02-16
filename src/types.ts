import type { Address } from 'wagmi';
import { BigNumber, ethers } from 'ethers';

export interface Option {
  name: string;
  address: Address;
}

export interface Range {
  from: number;
  to: number;
}

export enum OptionStage {
  NOT_STARTED,
  DEPOSIT,
  LOCK,
  Ended,
}

export interface OptionsStore {
  selectedOption?: Option;
  selectedOptionInfo: OptionInfo;
  selectedOptionPrevInfo: OptionInfo;
  availableOptions: Option[];
  availableOptionsRange: Range;
  selectedOptionPriceData: PriceData[];
  bidHistory: BidHistory[];
  endedBidHistory: BidHistory[];
  setSelectedOption: (option: Option) => void;
  setAvailableOptions: (options: Option[]) => void;
  setAvailableOptionsRange: (range: Range) => void;
  setSelectedOptionInfo: (info: OptionInfo) => void;
  setSelectedOptionPrevInfo: (info: OptionInfo) => void;
  setSelectedOptionPriceData: (data: PriceData[]) => void;
  addSelectedOptionPriceData: (data: PriceData) => void;
  setBidHistory: (data: BidHistory[]) => void;
  setEndedBidHistory: (data: BidHistory[]) => void;

  selectedOptionCurrentPrice: number;
}

export interface AppStore {
  session: string;
  setSession: (id: string) => void;
}

export interface OptionInfo {
  id: number;
  name: string;
  address: Address;
  isLoaded: boolean;
  totalPool: BigNumber;
  totalPoolFormatted: string;
  decimals: number;
  stage: OptionStage;
  optionStart: number;
  lockStart: number;
  optionEnd: number;
  bidTokenName: string;
  bidToken: Address;
  up: string;
  down: string;
  // currentPrice: string;
  fee: BigNumber;
  upBets: BigNumber;
  downBets: BigNumber;
  startPrice: BigNumber;
  closePrice: BigNumber;
}

export const getDefaultOptionInfo = (): OptionInfo => ({
  id: 0,
  name: '',
  decimals: 18,
  bidToken: ethers.constants.AddressZero,
  bidTokenName: '',
  address: ethers.constants.AddressZero,
  isLoaded: false,
  stage: OptionStage.NOT_STARTED,
  totalPool: BigNumber.from(0),
  totalPoolFormatted: '0.0',
  optionStart: 0,
  lockStart: 0,
  optionEnd: 0,
  up: (0).toFixed(1),
  down: (0).toFixed(1),
  // currentPrice: '0',
  fee: BigNumber.from(10),
  upBets: BigNumber.from(0),
  downBets: BigNumber.from(0),
  startPrice: BigNumber.from(0),
  closePrice: BigNumber.from(0),
});

export interface PriceData {
  time: number;
  price: number;
}

export enum BidType {
  DOWN,
  UP,
}

export interface BidHistory {
  optionId: number;
  bidId: number;
  date: number;
  amount: string;
  pair: string;
  direction: BidType;
  potentialWin: string;
  betResult: string;
  isWon: boolean;
  isFinished: boolean;
  isClaimed: boolean;
}
