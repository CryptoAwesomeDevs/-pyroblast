import React, { type FC } from 'react';
import styled from 'styled-components';
import { OptionInfoBox } from 'app/components/options-trading/option-details/OptionInfoBox';
import { FormattedMessage } from 'react-intl';
import { OptionStage } from 'app/types';

const OptionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const StyledOptionCoefficients = styled.div<{ live: boolean }>(({ theme, live }) => ({
  background: theme.bgColorPrimary,
  borderRadius: theme.secondaryBorderRadius,
  border: '2px solid',
  borderImage: live
    ? `linear-gradient(to right, transparent, ${theme.bgColorTertiary}, transparent) 1`
    : `linear-gradient(to right, transparent, ${theme.bgColorQuaternary}, transparent) 1`,
  height: 70,
  width: '100%',
  display: 'flex',
}));

const TimerContainer = styled.div<{ live: boolean }>(({ theme, live }) => ({
  background: live ? theme.bgColorTertiary : theme.bgColorQuaternary,
  borderBottomLeftRadius: theme.secondaryBorderRadius,
  borderBottomRightRadius: theme.secondaryBorderRadius,
  padding: '5px 15px',
  color: live ? theme.bgColorPrimary : theme.colorSecondary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fontWeight: 700,
  fontSize: 14,
  lineHeight: '90%',
  marginTop: 2,
}));

const OptionIdContainer = styled(TimerContainer)(({ theme }) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderTopLeftRadius: theme.secondaryBorderRadius,
  borderTopRightRadius: theme.secondaryBorderRadius,
  marginBottom: 2,
}));

interface OptionCoefficientsProps {
  stage: OptionStage;
  upPayout: number | string;
  downPayout: number | string;
  totalPool: number | string;
  timeLeft: number | string;
  optionId: number;
}

export const OptionCoefficients: FC<OptionCoefficientsProps> = (props) => {
  const { stage, totalPool, upPayout, downPayout, timeLeft, optionId } = props;

  const isLive = stage === OptionStage.LOCK;
  const emphasizedVariant = isLive ? 'emphasizedPrimary' : 'emphasizedSecondary';

  const getTitleText = () => {
    switch (stage) {
      case OptionStage.NOT_STARTED:
        return (
          <FormattedMessage
            id={'not-started-text'}
            defaultMessage="Waiting to start"
            description="Waiting to start"
          />
        );
      case OptionStage.DEPOSIT:
        return (
          <FormattedMessage
            id={'deposit-stage-text'}
            defaultMessage="Trading"
            description="Trading"
          />
        );
      case OptionStage.LOCK:
        return (
          <FormattedMessage
            id={'lock-stage-text'}
            defaultMessage="Trading is over"
            description="Trading is over"
          />
        );
      default:
        return (
          <FormattedMessage
            id={'not-started-text'}
            defaultMessage="Waiting to start"
            description="Waiting to start"
          />
        );
    }
  };

  const getTimerText = () => {
    switch (stage) {
      case OptionStage.NOT_STARTED:
        return (
          <FormattedMessage
            id={'starts-in-text'}
            defaultMessage="Trading starts in: {time}"
            description="Round starts in"
            values={{ time: timeLeft }}
          />
        );
      case OptionStage.DEPOSIT:
        return (
          <FormattedMessage
            id={'trading-ends-in-text'}
            defaultMessage="Trading ends in: {time}"
            description="Trading ends in"
            values={{ time: timeLeft }}
          />
        );
      case OptionStage.LOCK:
        return (
          <FormattedMessage
            id={'option-ends-in-text'}
            defaultMessage="Ends in: {time}"
            description="Ends in"
            values={{ time: timeLeft }}
          />
        );
      default:
        return (
          <FormattedMessage
            id={'option-disabled-timer'}
            defaultMessage="00:00"
            description="option-disabled-timer"
          />
        );
    }
  };

  return (
    <OptionContainer>
      <OptionIdContainer live={isLive}>
        <FormattedMessage
          id="option-details-option-id"
          defaultMessage="Option: {id}"
          description="Option details option id"
          values={{ id: optionId }}
        />
      </OptionIdContainer>

      <StyledOptionCoefficients live={isLive}>
        <OptionInfoBox
          variant="green"
          titleText={
            <FormattedMessage
              id="option-title-up-payout"
              defaultMessage="Up payout"
              description="Option info title 'Up payout'"
            />
          }
          contentText={upPayout}
        />
        <OptionInfoBox
          variant={emphasizedVariant}
          titleText={getTitleText()}
          contentText={totalPool}
        />
        <OptionInfoBox
          variant="red"
          titleText={
            <FormattedMessage
              id="option-title-down-payout"
              defaultMessage="Down payout"
              description="Option info title 'Down payout'"
            />
          }
          contentText={downPayout}
        />
      </StyledOptionCoefficients>

      <TimerContainer live={isLive}>{getTimerText()}</TimerContainer>
    </OptionContainer>
  );
};
