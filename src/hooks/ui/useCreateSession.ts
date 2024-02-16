import { useAppStore } from 'app/store';
import { useEffect } from 'react';
import { useTracking } from 'app/hooks/ui/useTracking';
import { uuid } from '@walletconnect/legacy-utils';
import { useAccount } from 'wagmi';

const _SESSION_ID = '_SESSION_ID';
export const useCreateSession = () => {
  const setSessionId = useAppStore((state) => state.setSession);
  const trackStartSession = useTracking('Start session');
  const trackConnectWallet = useTracking('Connect wallet');
  const trackDisconnectWallet = useTracking('Disconnect wallet');

  useAccount({
    onConnect: () => trackConnectWallet(),
    onDisconnect: () => trackDisconnectWallet(),
  });

  useEffect(() => {
    let sessionId = localStorage.getItem(_SESSION_ID);
    if (!sessionId) {
      sessionId = uuid();
      localStorage.setItem(_SESSION_ID, sessionId);
    }
    setSessionId(sessionId);
    trackStartSession({ sessionId });
  }, [setSessionId, trackStartSession]);
};
