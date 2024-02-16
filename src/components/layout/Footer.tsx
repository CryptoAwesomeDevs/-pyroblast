import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { config } from 'app/config';

const FooterContainer = styled.div({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'end',
});

const StyledFooter = styled.footer(({ theme }) => ({
  width: '100%',
  background: theme.bgColorPrimary,
  height: 40,
  display: 'flex',
  alignSelf: 'end',
  borderTopLeftRadius: theme.primaryBorderRadius,
  borderTopRightRadius: theme.primaryBorderRadius,
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledAppInfo = styled.div(({ theme }) => ({
  paddingLeft: 20,
  color: theme.bgColorTertiary,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  paddingRight: 20,
  color: theme.bgColorTertiary,
}));

export const Footer = () => {
  return (
    <FooterContainer>
      <StyledFooter>
        <StyledAppInfo>
          {config.appName} © {new Date().getFullYear()}
        </StyledAppInfo>
        {config.showFaucet && (
          <StyledLink
            href={config.faucetLink}
            target="_blank"
          >
            Testnet faucet
          </StyledLink>
        )}
      </StyledFooter>
    </FooterContainer>
  );
};
