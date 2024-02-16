import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AppStore, getDefaultOptionInfo, type OptionsStore } from 'app/types';

export const useOptionsStore = create<OptionsStore>()(
  immer((set) => ({
    availableOptions: [],
    availableOptionsRange: { from: 0, to: 5 },
    selectedOptionCurrentPrice: 0,
    selectedOptionInfo: getDefaultOptionInfo(),
    selectedOptionPrevInfo: getDefaultOptionInfo(),
    selectedOptionPriceData: [],
    bidHistory: [],
    endedBidHistory: [],
    setSelectedOption: (option) =>
      set((state) => {
        if (option.address !== state.selectedOption?.address) {
          state.selectedOption = option;
          state.selectedOptionPriceData = [];
        }
      }),
    setAvailableOptions: (options) =>
      set((state) => {
        state.availableOptions = options;

        if (
          options.length > 0 &&
          state.availableOptions.some((option) => option.address !== state.selectedOption?.address)
        ) {
          state.selectedOption = options[0];
        }
      }),
    setAvailableOptionsRange: (range) =>
      set((state) => {
        state.availableOptionsRange = range;
      }),
    setSelectedOptionInfo: (info) =>
      set((state) => {
        state.selectedOptionInfo = info;
      }),
    setSelectedOptionPrevInfo: (info) =>
      set((state) => {
        state.selectedOptionPrevInfo = info;
      }),
    setSelectedOptionPriceData: (data) =>
      set((state) => {
        state.selectedOptionPriceData = data;
      }),
    addSelectedOptionPriceData: (data) =>
      set((state) => {
        state.selectedOptionPriceData.push(data);
        state.selectedOptionCurrentPrice = Number(data.price.toFixed(2));
      }),
    setBidHistory: (data) =>
      set((state) => {
        state.bidHistory = data;
      }),
    setEndedBidHistory: (data) =>
      set((state) => {
        state.endedBidHistory = data;
      }),
  }))
);

export const useAppStore = create<AppStore>()(
  immer((set) => ({
    session: '',
    setSession: (id) =>
      set((state) => {
        state.session = id;
      }),
  }))
);
