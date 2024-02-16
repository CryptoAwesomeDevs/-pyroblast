import styled from 'styled-components';
import { FC } from 'preact/compat';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

export const Button = styled.button(({ theme }) => ({
  position: 'relative',
  width: '100%',
  borderRadius: theme.secondaryBorderRadius,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontFamily: theme.primaryFont,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '90%',
  transition: '0.3s',
  padding: '5px 20px',

  '&:active': {
    transition: '0.1s',
    opacity: 0.8,
  },

  '&:disabled': {
    opacity: 0.5,
  },
}));

export const CommonButton = styled(Button)(({ theme }) => ({
  width: 'max-content',
  background: theme.colorPrimary,
  color: theme.bgColorSecondary,

  '&:hover': {
    opacity: 0.8,
    // img: {
    //   filter: 'brightness(0)',
    // },
  },

  '&:active': {
    background: theme.bgColorSecondary,
    boxShadow: theme.primaryBgColorBoxShadowActive,
    color: theme.colorPrimary,
  },

  '&:disabled': {
    background: theme.bgColorSecondary,
    boxShadow: theme.primaryBgColorBoxShadowActive,
    color: theme.colorPrimary,
    opacity: 0.5,
  },
}));

export const OutlineButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.secondaryBorderRadius,
  borderWidth: 0,
  height: 40,
  padding: '5px 20px',

  color: theme.colorPrimary,
  background: theme.bgColorPrimary,
  boxShadow: theme.primaryBgColorBoxShadow,
  '&:hover': {
    color: theme.colorPrimary,
    background: theme.bgColorPrimary,
    boxShadow: theme.primaryBgColorBoxShadowHover,
  },
  '&:active': {
    color: theme.colorPrimary,
    background: theme.primaryBgColorBoxShadowActive,
    boxShadow: theme.primaryBgColorBoxShadowActive,
  },
}));

export const SmallCommonButtonButton = styled.button(({ theme }) => ({
  width: '100%',
  background: theme.bgColorSecondary,
  border: 'none',
  color: theme.colorPrimary,
  borderRadius: theme.tertiaryBorderRadius,
  padding: '6px 9px',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '90%',
  cursor: 'pointer',
  transition: '0.1s',
  '&:active': {
    background: theme.colorPrimary,
    borderColor: theme.colorPrimary,
    color: theme.bgColorPrimary,
  },
}));

export const StyledCallButton = styled(Button)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.colorQuaternary,
  padding: 10,
  '&:hover': {
    background: theme.colorQuaternary,
    img: {
      filter: 'brightness(0)',
    },
  },
}));

export const StyledPutButton = styled(Button)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.colorQuinary,
  padding: 10,
  '&:hover': {
    background: theme.colorQuinary,
    img: {
      filter: 'brightness(0)',
    },
  },
}));

export const StyledApproveButton = styled(CommonButton)({
  width: '100%',
});

export const CallButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <StyledCallButton {...props}>
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Image
        fill
        src={'/images/svg/call-icon.svg'}
        alt={'Call'}
      />
    </div>
  </StyledCallButton>
);

export const PutButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <StyledPutButton {...props}>
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <Image
        fill
        src={'/images/svg/put-icon.svg'}
        alt={'Call'}
      />
    </div>
  </StyledPutButton>
);

export const ApproveButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <StyledApproveButton {...props}>
    <FormattedMessage
      id="approve-button"
      defaultMessage="Approve"
      description="Approve button"
    />
  </StyledApproveButton>
);
