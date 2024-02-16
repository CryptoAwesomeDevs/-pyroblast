import { useOptionsStore } from 'app/store';
import { useCallback, useEffect, useState } from 'react';
import { toMMSS } from 'app/utils/time';
import { OptionStage } from 'app/types';

export const useOptionDetails = () => {
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const selectedOptionPrevInfo = useOptionsStore((state) => state.selectedOptionPrevInfo);

  const [prevTimeLeft, setPrevTimeLeft] = useState('00:00');
  const [currTimeLeft, setCurrTimeLeft] = useState('00:00');

  const getTimeLeft = useCallback(() => {
    const prevTime = toMMSS(selectedOptionPrevInfo.optionEnd - Date.now() / 1000);
    let currTime = '00:00';
    if (selectedOptionInfo.stage === OptionStage.NOT_STARTED) {
      currTime = toMMSS(selectedOptionInfo.optionStart - Date.now() / 1000);
    } else if (selectedOptionInfo.stage === OptionStage.DEPOSIT) {
      currTime = toMMSS(selectedOptionInfo.lockStart - Date.now() / 1000);
    }
    return { prevTime, currTime };
  }, [selectedOptionPrevInfo, selectedOptionInfo]);

  const setTimeLeft = useCallback(() => {
    const times = getTimeLeft();
    setPrevTimeLeft(times.prevTime);
    setCurrTimeLeft(times.currTime);
  }, [getTimeLeft]);

  useEffect(() => {
    setTimeLeft();
    const timer = setInterval(setTimeLeft, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [setTimeLeft]);

  return {
    selectedOptionInfo,
    selectedOptionPrevInfo,
    prevTimeLeft,
    currTimeLeft,
  };
};
