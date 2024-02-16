import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Column, Table, TableHeader } from '../common/Table';
import { CommonButton } from '../common/Button';
import { Tabs } from '../common/Tabs';
import { HistoryType, useOptionHistory } from 'app/hooks/web3/useOptionHistory';
import { useOptionsStore } from 'app/store';
import { BidHistory, BidType } from 'app/types';
import { useOptionClaim } from 'app/hooks/web3/useOptionClaim';
import { useWindowSize } from 'app/hooks/ui/useWindowSize';
import { FormattedMessage } from 'react-intl';
import { useOptionClaimAll } from 'app/hooks/web3/useOptionClaimAll';
import { media } from 'app/utils/media';

const StyledBiddingHistory = styled.div(({ theme }) => ({
  background: theme.bgColorPrimary,
  borderRadius: theme.primaryBorderRadius,
}));

const StyledSpan = styled.span<{ up: boolean }>(({ up, theme }) => ({
  display: 'block',
  font: 'inherit',
  color: up ? theme.colorQuaternary : theme.colorQuinary,
}));

const TableHead = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 20px',
});

const TableContainer = styled.div(({ theme }) => ({
  height: 300,
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    background: 'transparent',
    width: 5,
  },

  '::-webkit-scrollbar-thumb': {
    background: theme.colorPrimary,
    borderRadius: 3,
    width: 5,
  },
}));

const ButtonsWrap = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 42,
});

const StyledTableHeader = styled(TableHeader)(
  media.md({
    marginBottom: -25,
  })
);

export const BiddingHistory = () => {
  const [historyType, setHistoryType] = useState<HistoryType>(HistoryType.ACTIVE);
  useOptionHistory(historyType);

  const { claim } = useOptionClaim();
  const { lgDown } = useWindowSize();
  const bidHistory = useOptionsStore((state) =>
    historyType === HistoryType.ACTIVE ? state.bidHistory : state.endedBidHistory
  );
  const { claimAll, hasUnclaimedBids } = useOptionClaimAll();

  const columns: Column<BidHistory>[] = useMemo(
    () => [
      {
        key: 'id',
        name: 'Id',
        hide: lgDown,
        render: (row) => `${row.optionId}-${row.bidId}`,
      },
      {
        key: 'date',
        name: 'Date',
        render: (row) => `${new Date(row.date).toLocaleTimeString()}  ${new Date(row.date).toLocaleDateString()}`,
      },
      {
        key: 'amount',
        name: 'Amount',
        hide: lgDown,
      },
      {
        key: 'pair',
        name: 'Pair',
      },
      {
        key: 'direction',
        name: 'Direction',
        render: (row) => (
          <StyledSpan up={row.direction === BidType.UP}>{row.direction === BidType.UP ? 'UP' : 'DOWN'} </StyledSpan>
        ),
        hide: lgDown,
      },
      historyType === HistoryType.ACTIVE
        ? {
            key: 'potentialWin',
            name: 'Potential win',
            render: (row) => Number(row.potentialWin).toFixed(2),
          }
        : {
            key: 'bet_result',
            name: 'Bet result',
            render: (row) => <StyledSpan up={row.isWon}>{Number(row.betResult).toFixed(2)}</StyledSpan>,
          },
      {
        key: '',
        name: '',
        render: (row) =>
          row.isWon &&
          !row.isClaimed && <CommonButton onClick={() => claim(row.optionId, row.bidId)}>Claim</CommonButton>,
      },
    ],
    [lgDown, claim, historyType]
  );

  return (
    <StyledBiddingHistory>
      <StyledTableHeader>
        <FormattedMessage
          id="your-trading-history"
          defaultMessage="Your trading history"
          description="Your trading history"
        />
      </StyledTableHeader>
      <TableHead>
        <ButtonsWrap>
          <Tabs
            tabs={['Active', 'Finished']}
            onChange={setHistoryType}
          />
        </ButtonsWrap>
        <CommonButton
          disabled={!hasUnclaimedBids}
          onClick={claimAll}
        >
          Claim all
        </CommonButton>
      </TableHead>
      <TableContainer>
        <Table
          rows={bidHistory}
          columns={columns}
        />
      </TableContainer>
    </StyledBiddingHistory>
  );
};
