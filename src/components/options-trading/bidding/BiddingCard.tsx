import React from 'react';
import styled from 'styled-components';
import { CommitInput } from 'app/components/options-trading/bidding/CommitInput';
import { NotStartedOverlay } from 'app/components/options-trading/bidding/NotStartedOverlay';

const StyledBiddingCard = styled.div(({ theme }) => ({
  position: 'relative',
  height: '100%',
  background: theme.bgColorPrimary,
  borderRadius: theme.primaryBorderRadius,
  padding: '26px 22px',
}));

export const BiddingCard = () => {
  return (
    <StyledBiddingCard>
      <NotStartedOverlay />
      <CommitInput />
    </StyledBiddingCard>
  );
};
