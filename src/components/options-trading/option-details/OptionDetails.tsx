import React from 'react';
import styled from 'styled-components';
import { OptionCoefficients } from 'app/components/options-trading/option-details/OptionCoefficients';
import { useOptionDetails } from 'app/hooks/logic/useOptionDetails';
import { media } from 'app/utils/media';

const StyledOptionData = styled.div(
  media.xs({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }),
  media.lg({
    gap: 30,
    flexDirection: 'row',
  })
);

export const OptionDetails = () => {
  const { selectedOptionInfo, selectedOptionPrevInfo, prevTimeLeft, currTimeLeft } = useOptionDetails();
  return (
    <StyledOptionData>
      <OptionCoefficients
        stage={selectedOptionPrevInfo.stage}
        upPayout={`${selectedOptionPrevInfo.up}x`}
        downPayout={`${selectedOptionPrevInfo.down}x`}
        totalPool={`$${selectedOptionPrevInfo.totalPoolFormatted}`}
        timeLeft={prevTimeLeft}
        optionId={selectedOptionPrevInfo.id}
      />
      <OptionCoefficients
        stage={selectedOptionInfo.stage}
        upPayout={`${selectedOptionInfo.up}x`}
        downPayout={`${selectedOptionInfo.down}x`}
        totalPool={`$${selectedOptionInfo.totalPoolFormatted}`}
        timeLeft={currTimeLeft}
        optionId={selectedOptionInfo.id}
      />
    </StyledOptionData>
  );
};
