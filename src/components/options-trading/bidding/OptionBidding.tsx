import React from 'react';
import { BalanceCard } from 'app/components/options-trading/bidding/BalanceCard';
import { OptionChart } from 'app/components/options-trading/bidding/OptionChart';
import styled from 'styled-components';
import { BiddingCard } from 'app/components/options-trading/bidding/BiddingCard';
import { media } from 'app/utils/media';

const OptionBiddingContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: 10,
  },
  media.xs({
    flexDirection: 'column-reverse',
  }),
  media.sm({
    flexDirection: 'row',
  }),
  media.xl({
    flexDirection: 'row',
  })
);

const BiddingContainer = styled.div(
  media.xs({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }),
  media.xl({
    display: 'flex',
    flexDirection: 'column',
    width: 277,
    gap: 10,
  }),
  media.xxl({
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    gap: 10,
  })
);

const ChartContainer = styled.div(
  {
    width: '100%',
  },
  media.xs({
    height: 322,
    minWidth: 100,
  }),
  media.xl({
    height: 322,
  })
);

export const OptionBidding = () => {
  return (
    <OptionBiddingContainer>
      <BiddingContainer>
        <BalanceCard />
        <BiddingCard />
      </BiddingContainer>
      <ChartContainer>
        <OptionChart />
      </ChartContainer>
    </OptionBiddingContainer>
  );
};
