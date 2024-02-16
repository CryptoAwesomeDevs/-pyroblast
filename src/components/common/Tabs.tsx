import React from 'react';
import styled from 'styled-components';

interface TabsProps {
  tabs: string[];
  onChange?: (value: number) => void;
}

const StyledTabsContainer = styled.div(({ theme }) => ({
  width: 'max-content',
  height: 36,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: theme.colorPrimary,
  borderRadius: theme.secondaryBorderRadius,
}));

const StyledTab = styled.div<{ active: boolean }>(({ theme, active }) => ({
  width: '50%',
  height: '100%',
  padding: '10px 30px',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: '0.3s',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '90%',
  color: theme.colorPrimary,
  ...(active && {
    background: theme.colorPrimary,
    borderRadius: '6px',
    color: theme.bgColorSecondary,
    ':first-child': {
      borderRadius: '6px 0px 0px 6px',
    },
    ':last-child': {
      borderRadius: '0px 6px 6px 0px',
    },
  }),
}));

export const Tabs: React.FC<TabsProps> = ({ tabs, onChange }) => {
  const [active, setActive] = React.useState(tabs[0]);

  const handleTabChange = (tab: number) => {
    setActive(tabs[tab]);
    onChange?.(tab);
  };

  return (
    <StyledTabsContainer>
      {tabs.map((tab, index) => (
        <StyledTab
          active={active === tab}
          key={index}
          onClick={() => handleTabChange(index)}
        >
          {tab}
        </StyledTab>
      ))}
    </StyledTabsContainer>
  );
};
