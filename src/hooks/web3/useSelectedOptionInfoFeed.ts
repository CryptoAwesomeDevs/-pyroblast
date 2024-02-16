import { useCallback, useEffect } from 'react';
import { OptionStage } from 'app/types';
import { useSelectedOptionInfo } from 'app/hooks/web3/useSelectedOptionInfo';

export const useSelectedOptionInfoFeed = () => {
  const { data, refetch: refetchInfo, isFetchedAfterMount } = useSelectedOptionInfo();

  const refetch = useCallback(async () => {
    await Promise.all([refetchInfo()]);
  }, [refetchInfo]);

  useEffect(() => {
    if (isFetchedAfterMount) {
      const interval = setInterval(refetch, 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isFetchedAfterMount, refetch]);

  useEffect(() => {
    if (data) {
      let timer: NodeJS.Timer;
      if (data.currentRound.stage === OptionStage.NOT_STARTED) {
        const timeout = (2 + data.currentRound.optionStart) * 1000 - Date.now();
        if (timeout > 0) {
          timer = setTimeout(() => {
            refetch();
          }, (2 + data.currentRound.optionStart) * 1000 - Date.now());
        }
      }
      if (data.currentRound.stage === OptionStage.DEPOSIT) {
        const timeout = (2 + data.currentRound.lockStart) * 1000 - Date.now();
        if (timeout > 0) {
          timer = setTimeout(() => {
            refetch();
          }, timeout);
        }
      }
      return () => {
        clearTimeout(timer);
      };
    }
  }, [data, refetch]);
};
