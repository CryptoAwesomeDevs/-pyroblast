import React from 'react';
import styled from 'styled-components';
import { ConnectKitButton } from 'connectkit';
import Image from 'next/image';
import { media } from 'app/utils/media';
import { useRouter } from 'next/navigation';
import { OutlineButton } from 'app/components/common/Button';

const StyledAppBar = styled.div(({ theme }) => ({
  width: '100%',
  background: theme.bgColorPrimary,
  minHeight: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AppBarContainer = styled.div(
  {
    position: 'relative',
    maxWidth: 1440,
    width: '100%',
    padding: '0 10px',
    display: 'flex',
  },
  media.md({
    padding: '0 10px',
  }),
  media.lg({
    padding: '0 156px',
  }),
  media.xxl({
    maxWidth: 'unset',
    width: '80vw',
    padding: '0 156px',
  })
);

// const AppName = styled.div(({ theme }) => ({
//   color: theme.colorPrimary,
//   fontWeight: 500,
//   fontSize: 42,
//   lineHeight: '90%',
//   cursor: 'pointer',
// }));

const AppLogo = styled.div(
  {
    position: 'relative',
    // left: 10,
    // top: '50%',
    // transform: 'translateY(-50%)',

    height: 68,
    width: 68,
    cursor: 'pointer',
  },
  media.sm({
    // position: 'absolute',
    // left: '50%',
    // top: '50%',
    // transform: 'translate(-50%, -50%)',
  })
);

const ConnectWalletContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  marginLeft: 'auto',
});

const TournamentIcon = styled.div(({ theme }) => ({
  mask: 'url("/images/svg/tournaments-icon.svg") no-repeat center',
  backgroundColor: theme.colorPrimary,
  height: 30,
  width: 30,
}));

export const AppBar = () => {
  const router = useRouter();
  return (
    <StyledAppBar>
      <AppBarContainer>
        <AppLogo onClick={() => router.push('/')}>
          <Image
            fill
            src={'/images/svg/logo-main.svg'}
            alt={'Logo'}
          />
        </AppLogo>

        <ConnectWalletContainer>
          <OutlineButton onClick={() => router.push('/tournaments')}>
            <TournamentIcon />
          </OutlineButton>
          <ConnectKitButton />
        </ConnectWalletContainer>
      </AppBarContainer>
    </StyledAppBar>
  );
};
