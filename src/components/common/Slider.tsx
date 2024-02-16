import React from 'react';
import styled from 'styled-components';

const SliderInput = styled.input(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: theme.colorTertiary,
  outline: 'none',
  opacity: 0.9,
  transition: 'opacity 0.2s',
  borderRadius: '5px',
  WebkitAppearance: 'none',

  ':hover': {
    opacity: 1,
  },

  '::-webkit-slider-thumb': {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '11px',
    height: '11px',
    background: theme.bgColorPrimary,
    cursor: 'pointer',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: theme.colorPrimary,
  },

  '::-moz-range-thumb': {
    width: '11px',
    height: '11px',
    background: theme.bgColorPrimary,
    cursor: 'pointer',
    borderRadius: '50%',
    border: '1px solid',
    borderColor: theme.colorPrimary,
  },
}));

export const Slider: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <SliderInput
      {...props}
      type="range"
    />
  );
};
