import { useAccount, useQuery } from 'wagmi';
import axios from 'axios';

export interface TournamentBalance {
  place: number;
  wallet: string;
  balance: number;
}

export interface TournamentData {
  user?: TournamentBalance;
  leaderBoard: TournamentBalance[];
}

export const useTournamentBalances = () => {
  const { address } = useAccount();
  const { data = { leaderBoard: [] } } = useQuery(
    ['fetch-tournament-balances', address],
    () => axios.get<TournamentData>('/api/tournament/balances', { params: { address } }),
    {
      cacheTime: 0,
      select: (data) => data.data,
      refetchOnWindowFocus: true,
    }
  );
  return { data };
};
