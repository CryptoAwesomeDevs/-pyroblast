import React, { type FC, ReactNode } from 'react';
import styled, { CSSObject, DefaultTheme } from 'styled-components';

type Variant = 'emphasizedPrimary' | 'emphasizedSecondary' | 'red' | 'green';

interface OptionInfoBoxProps {
  variant: Variant;
  titleText?: ReactNode | string;
  contentText?: ReactNode | string;
}

const getOutlineStyle = (variant: Variant, theme: DefaultTheme): CSSObject => {
  if (variant === 'emphasizedPrimary') {
    return {
      border: '1px solid',
      borderColor: theme.bgColorTertiary,
    };
  } else if (variant === 'emphasizedSecondary') {
    return {
      border: '1px solid',
      borderColor: theme.bgColorQuaternary,
    };
  }
  return {};
};

const StyledOptionInfoBox = styled.div<{ variant: Variant }>(({ variant, theme }) => ({
  width: '33.3%',
  ...getOutlineStyle(variant, theme),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

const getBoxTitleStyle = (variant: Variant, theme: DefaultTheme): CSSObject => {
  if (variant === 'emphasizedPrimary') {
    return {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      background: theme.bgColorTertiary,
      color: theme.bgColorPrimary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 19,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '90%',
      textTransform: 'uppercase',
    };
  } else if (variant === 'emphasizedSecondary') {
    return {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      background: theme.bgColorQuaternary,
      color: theme.bgColorQuinary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 19,
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '90%',
      textTransform: 'uppercase',
    };
  } else {
    return {
      opacity: 0.2,
    };
  }
};

const BoxTitle = styled.div<{ variant: Variant }>(({ theme, variant }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '90%',
  ...getBoxTitleStyle(variant, theme),
}));

const getContentStyle = (variant: Variant, theme: DefaultTheme): CSSObject => {
  if (variant === 'red') {
    return {
      color: theme.colorQuinary,
    };
  } else if (variant === 'green') {
    return {
      color: theme.colorQuaternary,
    };
  } else if (variant === 'emphasizedPrimary') {
    return {
      color: theme.colorSecondary,
      marginTop: 20,
    };
  } else if (variant === 'emphasizedSecondary') {
    return {
      color: theme.bgColorTertiary,
      marginTop: 20,
    };
  }
  return {};
};

const BoxContent = styled.div<{ variant: Variant }>(({ theme, variant }) => ({
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '90%',
  marginTop: 6,
  ...getContentStyle(variant, theme),
}));

export const OptionInfoBox: FC<OptionInfoBoxProps> = (props) => {
  const { variant, titleText, contentText } = props;

  return (
    <StyledOptionInfoBox variant={variant}>
      <BoxTitle variant={variant}>{titleText}</BoxTitle>
      <BoxContent variant={variant}>{contentText}</BoxContent>
    </StyledOptionInfoBox>
  );
};
