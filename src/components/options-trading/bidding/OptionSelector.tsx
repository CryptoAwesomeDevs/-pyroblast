import React from 'react';
import { useOptionsStore } from 'app/store';
import styled from 'styled-components';
import { Select } from '../../common/Select';

const StyledOptionSelector = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: 5,
  paddingLeft: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
});

const StyledCurrentPrice = styled.div(({ theme }) => ({
  color: theme.colorPrimary,
  fontSize: 14,
}));

export const OptionSelector = () => {
  const selectedOption = useOptionsStore((state) => state.selectedOption);
  const availableOptions = useOptionsStore((state) => state.availableOptions);
  const setSelectedOption = useOptionsStore((state) => state.setSelectedOption);
  const currentPrice = useOptionsStore((state) => state.selectedOptionCurrentPrice);

  return (
    <StyledOptionSelector>
      <StyledCurrentPrice>{currentPrice}</StyledCurrentPrice>
      <Select
        options={availableOptions}
        onSelect={setSelectedOption}
        selected={selectedOption}
      />
    </StyledOptionSelector>
  );
};
