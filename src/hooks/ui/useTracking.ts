import axios from 'axios';
import { useAccount, useMutation } from 'wagmi';
import { useAppStore } from 'app/store';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

interface TrackingEvent {
  name: string;
  sessionId: string;
  address: string;
  origin: string;
  ref?: string;
  data?: Record<string, unknown>;
}

export const useTracking = (name: string) => {
  const sessionId = useAppStore((state) => state.session);
  const router = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : undefined;
  const ref = queryString.parse(router.asPath.split(/\?/)[1])['ref'];
  const { address } = useAccount();
  const { mutate } = useMutation({
    mutationFn: async (partialEvent?: Partial<TrackingEvent>) =>
      await axios.post(`/api/tracking/event`, { name, address, ref, origin, sessionId, ...partialEvent }),
    retry: false,
    retryDelay: 0,
  });
  return useCallback((partialEvent?: Partial<TrackingEvent>) => mutate(partialEvent), [mutate]);
};
