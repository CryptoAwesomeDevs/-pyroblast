import React from 'react';
import { Column, Table } from 'app/components/common/Table';
import styled from 'styled-components';
import { TournamentBalance, useTournamentBalances } from 'app/hooks/query/useTournamentBalances';
import { FormattedMessage } from 'react-intl';

const columns: Column<TournamentBalance>[] = [
  {
    key: 'place',
    name: 'Place',
  },
  {
    key: 'wallet',
    name: 'Wallet',
  },
  {
    key: 'balance',
    name: 'Balance',
    render: (row) => (Number(row.balance) ?? 0).toFixed(2),
  },
];

const TournamentsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
});

const TournamentsTableContainer = styled.div(({ theme }) => ({
  background: theme.bgColorPrimary,
  borderRadius: theme.primaryBorderRadius,
  display: 'flex',
  flexDirection: 'column',
}));

const TableHeader = styled.div(({ theme }) => ({
  background: theme.colorPrimary,
  borderBottomRightRadius: theme.primaryBorderRadius,
  borderBottomLeftRadius: theme.primaryBorderRadius,
  padding: '10px 20px',
  color: theme.bgColorPrimary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
}));

export const TournamentsTable = () => {
  const { data } = useTournamentBalances();
  return (
    <TournamentsContainer>
      <img
        src="/images/svg/images/tournaments-lg.svg"
        alt="bears"
      />
      {data.user && (
        <TournamentsTableContainer>
          <TableHeader>
            <FormattedMessage
              id="tournaments-user-info-table-header"
              defaultMessage="User statistics"
              description=""
            />
          </TableHeader>
          <Table
            rows={[data.user]}
            columns={columns}
          />
        </TournamentsTableContainer>
      )}

      <TournamentsTableContainer>
        <TableHeader>
          <FormattedMessage
            id="tournaments-table-header"
            defaultMessage="Leaderboard"
            description=""
          />
        </TableHeader>
        <Table
          rows={data.leaderBoard}
          columns={columns}
        />
      </TournamentsTableContainer>
    </TournamentsContainer>
  );
};
