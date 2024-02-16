import React from 'react';
import { Option } from 'app/types';
import styled from 'styled-components';

interface SelectProps {
  options: Option[];
  onSelect?: (value: Option) => void;
  selected?: Option;
}

const StyledSelectContainer = styled.div(({ theme }) => ({
  height: 30,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  color: theme.colorPrimary,
}));

const SelectContent = styled.div({
  height: 30,
  padding: 10,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  cursor: 'pointer',
  transition: 'all 0.3s ease 0s',
  color: 'inherit',
});

const SelectWrap = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: '-1.5px',
});

const DownArrowWrapper = styled.div<{ isRotate: boolean }>(({ isRotate, theme }) => ({
  width: 24,
  height: 24,
  right: 0,
  top: '20%',
  bottom: '37.44%',
  backgroundColor: theme.colorPrimary,
  mask: 'url("/images/svg/down-arrow-icon.svg") no-repeat center',
  transform: isRotate ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: '0.3s',
}));

const VisibleOptions = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 35,
  right: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.bgColorPrimary,
  border: '1.5px solid',
  borderColor: theme.colorPrimary,
  borderRadius: theme.secondaryBorderRadius,
  zIndex: 1,
}));

const OptionItem = styled.div(({ theme }) => ({
  height: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `1.5px solid ${theme.colorPrimary}`,
  cursor: 'pointer',

  ':last-of-type': {
    borderBottom: 'none',
  },
}));

export const Select: React.FC<SelectProps> = ({ options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openSelect = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: Option) => {
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <StyledSelectContainer>
      <SelectContent onClick={openSelect}>
        <SelectWrap>{selected?.name}</SelectWrap>
        <DownArrowWrapper isRotate={isOpen} />
      </SelectContent>
      {isOpen && (
        <VisibleOptions>
          {options?.map((option) => (
            <OptionItem
              onClick={() => onOptionClicked(option)}
              key={option.address}
            >
              {option.name}
            </OptionItem>
          ))}
        </VisibleOptions>
      )}
    </StyledSelectContainer>
  );
};
