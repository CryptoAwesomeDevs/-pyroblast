import React, { useEffect, useId, useState } from 'react';
import styled from 'styled-components';
import { ValueTextRow } from 'app/components/common/ValueTextRow';
import { FormattedMessage } from 'react-intl';
import { Slider } from 'app/components/common/Slider';
import { ApproveButton, CallButton, PutButton, SmallCommonButtonButton } from 'app/components/common/Button';
import { getPotentialWin, roundTo } from 'app/utils/math';
import { useBiddingTokenAllowance } from 'app/hooks/web3/useBiddingTokenAllowance';
import { useOptionBid } from 'app/hooks/web3/useOptionBid';
import { useBiddingTokenBalance } from 'app/hooks/web3/useBiddingTokenBalance';
import { useOptionsStore } from 'app/store';
import { BidType } from 'app/types';
import { ethers } from 'ethers';
import { Modal } from 'app/components/common/Modal';
import { LoadingIcon } from 'app/components/common/LoadingIcon';

const InputContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const InputDescription = styled(ValueTextRow)(({ theme }) => ({
  color: theme.colorPrimary,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '90%',
}));

const StyledInput = styled.input(({ theme }) => ({
  marginTop: 9,
  borderRadius: theme.secondaryBorderRadius,
  background: 'transparent',
  border: '1px solid',
  borderColor: theme.colorPrimary,
  textAlign: 'right',
  padding: 7,
  color: theme.colorPrimary,
  letterSpacing: 0.5,
  fontWeight: 500,
  fontSize: 14,
  fontFamily: theme.primaryFont,
  '&:focus-visible': {
    outline: 'none',
  },
  '&::placeholder': {
    color: theme.colorTertiary,
  },
}));

const StyledSlider = styled(Slider)({
  marginTop: 20,
});

const FixedAmountButtonContainer = styled.div({
  display: 'flex',
  marginTop: 17,
  gap: 2,
});

const BiddingButtonsContainer = styled.div({
  marginTop: 26,
  display: 'flex',
  height: 36,
  width: '100%',
  gap: 9,
});

const RewardContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: 11,
});

const CallText = styled.div(({ theme }) => ({
  color: theme.colorQuaternary,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '90%',
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
}));

const PutText = styled.div(({ theme }) => ({
  color: theme.colorQuinary,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '90%',
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
}));

const SELECTABLE_AMOUNTS = [
  {
    name: '10%',
    value: 0.1,
  },
  {
    name: '25%',
    value: 0.25,
  },
  {
    name: '50%',
    value: 0.5,
  },
  {
    name: '75%',
    value: 0.75,
  },
  {
    name: 'Max',
    value: 1,
  },
];

export const CommitInput = () => {
  const { name, formattedBalanceNum, isFetchedAfterMount } = useBiddingTokenBalance();
  const [isInit, setInit] = useState(false);
  const [commitValue, setCommitValue] = useState(0);
  const { isAllowed, approve, isLoading: allowLoading, state: allowState } = useBiddingTokenAllowance(commitValue);
  const { placebidUp, placebidDown, state: bidState, isLoading: bidLoading } = useOptionBid(commitValue, isAllowed);
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  const id = useId();

  useEffect(() => {
    if (isFetchedAfterMount && !isInit) {
      setCommitValue(parseFloat((formattedBalanceNum * 0.1).toFixed(2)));
      setInit(true);
    }
  }, [isInit, isFetchedAfterMount, formattedBalanceNum]);

  const clearError = () => {
    if (allowState.isError) {
      allowState.clearError();
    } else if (bidState.isError) {
      bidState.clearError();
    }
  };

  return (
    <InputContainer>
      <Modal
        show={allowLoading || bidLoading}
        dismissible={false}
      >
        <LoadingIcon />
        <div>Pending transaction</div>
      </Modal>
      <Modal
        show={allowState.isError || bidState.isError}
        onDismiss={clearError}
      >
        <div>Transaction failed</div>
      </Modal>
      <InputDescription
        text={
          <FormattedMessage
            id={'bidding-input-commit-text'}
            defaultMessage={'Commit:'}
            description={'Commit text displayed in bidding card'}
          />
        }
        value={name}
      />

      <StyledInput
        placeholder={'0.0'}
        value={commitValue}
        onChange={(event) => setCommitValue(parseInt(event.target.value || '0'))}
      />

      <StyledSlider
        min={0}
        max={formattedBalanceNum}
        step={formattedBalanceNum / 100}
        value={commitValue}
        onChange={(event) => setCommitValue(roundTo(event.target.value, 2))}
      />

      <FixedAmountButtonContainer>
        {SELECTABLE_AMOUNTS.map((item, index) => (
          <SmallCommonButtonButton
            key={id + index}
            onClick={() => setCommitValue(roundTo(formattedBalanceNum * item.value, 2))}
          >
            {item.name}
          </SmallCommonButtonButton>
        ))}
      </FixedAmountButtonContainer>

      {isAllowed ? (
        <>
          <BiddingButtonsContainer>
            <CallButton onClick={placebidUp} />
            <PutButton onClick={placebidDown} />
          </BiddingButtonsContainer>
          <RewardContainer>
            <CallText>
              $
              {parseFloat(
                getPotentialWin(BidType.UP, ethers.utils.parseEther(commitValue.toString()), selectedOptionInfo)
              ).toFixed(2)}
            </CallText>
            <PutText>
              $
              {parseFloat(
                getPotentialWin(BidType.DOWN, ethers.utils.parseEther(commitValue.toString()), selectedOptionInfo)
              ).toFixed(2)}
            </PutText>
          </RewardContainer>
        </>
      ) : (
        <BiddingButtonsContainer>
          <ApproveButton onClick={approve} />
        </BiddingButtonsContainer>
      )}
    </InputContainer>
  );
};
