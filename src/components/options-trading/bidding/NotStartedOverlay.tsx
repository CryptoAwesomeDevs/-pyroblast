import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { OptionStage } from 'app/types';
import { FormattedMessage } from 'react-intl';
import { toMMSS } from 'app/utils/time';
import { useOptionsStore } from 'app/store';

const StyledOverlay = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(5px)',
  borderRadius: theme.primaryBorderRadius,
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const StyledOverlayText = styled.div({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '90%',
  marginBottom: 5,
});

export const NotStartedOverlay = () => {
  const [nextOptionStart, setNextOptionStart] = useState('00:00');
  const selectedOptionInfo = useOptionsStore((state) => state.selectedOptionInfo);
  useEffect(() => {
    const timer = setInterval(() => {
      setNextOptionStart(toMMSS(selectedOptionInfo.optionStart - Date.now() / 1000));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [selectedOptionInfo]);

  return (
    <>
      {selectedOptionInfo.stage !== OptionStage.DEPOSIT && (
        <StyledOverlay>
          <StyledOverlayText>
            <FormattedMessage
              id="next-option-starts"
              defaultMessage="Next round starts in:"
              description="Next round starts in:"
            />
          </StyledOverlayText>
          <StyledOverlayText>{nextOptionStart}</StyledOverlayText>
        </StyledOverlay>
      )}
    </>
  );
};
