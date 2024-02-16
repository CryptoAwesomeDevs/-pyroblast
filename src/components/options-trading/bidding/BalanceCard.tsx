import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { ValueTextRow } from 'app/components/common/ValueTextRow';
import { useBiddingTokenBalance } from 'app/hooks/web3/useBiddingTokenBalance';
import { CommonButton } from 'app/components/common/Button';
import { useTokenMint } from 'app/hooks/web3/testnet/useTokenMint';

const StyledBalanceCard = styled(ValueTextRow)(({ theme }) => ({
  borderRadius: theme.primaryBorderRadius,
  background: theme.bgColorPrimary,
  padding: '17px 22px',

  fontWeight: 500,
  fontSize: 14,
  lineHeight: '90%',
}));

const BalanceValue = styled.div({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: 10,
});

const PlusButton = styled(CommonButton)({
  padding: 2,
  height: 15,
  width: 15,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const BalanceCard = () => {
  const { formattedBalance } = useBiddingTokenBalance();
  const { write, isMinted } = useTokenMint();

  return (
    <StyledBalanceCard
      text={
        <FormattedMessage
          id={'balance-text'}
          defaultMessage={'Balance:'}
          description={'Balance card text'}
        />
      }
      value={
        <BalanceValue>
          <FormattedMessage
            id={'balance-amount'}
            defaultMessage={'${amount}'}
            description={'Balance card amount'}
            values={{ amount: formattedBalance }}
          />
          {!isMinted && <PlusButton onClick={write}>+</PlusButton>}
        </BalanceValue>
      }
    />
  );
};
