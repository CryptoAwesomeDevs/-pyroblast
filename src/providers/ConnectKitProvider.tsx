import React, { type PropsWithChildren } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import { ConnectKitProvider as CKProvider } from 'connectkit';

const getCustomTheme = (theme: DefaultTheme) => ({
  '--ck-font-family': theme.primaryFont,
  '--ck-body-background': theme.bgColorPrimary,
  '--ck-body-color': theme.colorPrimary,
  '--ck-body-background-secondary': theme.colorPrimary,
  '--ck-body-action-color': theme.actionColor,

  '--ck-connectbutton-border-radius': theme.secondaryBorderRadius,
  '--ck-connectbutton-background': theme.bgColorPrimary,
  '--ck-connectbutton-color': theme.colorPrimary,
  '--ck-connectbutton-hover-color': theme.colorPrimary,
  '--ck-connectbutton-hover-background': theme.bgColorPrimary,
  '--ck-connectbutton-box-shadow': theme.primaryBgColorBoxShadow,
  '--ck-connectbutton-hover-box-shadow': theme.primaryBgColorBoxShadowHover,
  '--ck-connectbutton-active-box-shadow': theme.primaryBgColorBoxShadowActive,
  '--ck-connectbutton-active-color': theme.colorPrimary,
  '--ck-connectbutton-active-background': theme.primaryBgColorBoxShadowActive,

  '--ck-primary-button-border-radius': theme.secondaryBorderRadius,
  '--ck-primary-button-background': theme.bgColorPrimary,
  '--ck-primary-button-color': theme.colorPrimary,
  '--ck-primary-button-hover-color': theme.colorPrimary,
  '--ck-primary-button-hover-background': theme.bgColorPrimary,
  '--ck-primary-button-box-shadow': theme.primaryBgColorBoxShadow,
  '--ck-primary-button-hover-box-shadow': theme.primaryBgColorBoxShadowHover,
  '--ck-primary-button-active-box-shadow': theme.primaryBgColorBoxShadowActive,
  '--ck-primary-button-active-color': theme.colorPrimary,
  '--ck-primary-button-active-background': theme.primaryBgColorBoxShadowActive,

  '--ck-secondary-button-border-radius': theme.secondaryBorderRadius,
  '--ck-secondary-button-background': theme.bgColorPrimary,
  '--ck-secondary-button-color': theme.colorPrimary,
  '--ck-secondary-button-hover-color': theme.colorPrimary,
  '--ck-secondary-button-hover-background': theme.bgColorPrimary,
  '--ck-secondary-button-box-shadow': theme.primaryBgColorBoxShadow,
  '--ck-secondary-button-hover-box-shadow': theme.primaryBgColorBoxShadowHover,
  '--ck-secondary-button-active-box-shadow': theme.primaryBgColorBoxShadowActive,
  '--ck-secondary-button-active-color': theme.colorPrimary,
  '--ck-secondary-button-active-background': theme.primaryBgColorBoxShadowActive,

  '--ck-tertiary-button-border-radius': theme.primaryBorderRadius,
  '--ck-tertiary-button-background': theme.bgColorPrimary,
  '--ck-tertiary-button-color': theme.colorPrimary,
  '--ck-tertiary-button-hover-color': theme.colorPrimary,
  '--ck-tertiary-button-hover-background': theme.bgColorPrimary,
  '--ck-tertiary-button-box-shadow': theme.primaryBgColorBoxShadow,
  '--ck-tertiary-button-hover-box-shadow': theme.primaryBgColorBoxShadowHover,
  '--ck-tertiary-button-active-box-shadow': theme.primaryBgColorBoxShadowActive,
  '--ck-tertiary-button-active-color': theme.colorPrimary,
  '--ck-tertiary-button-active-background': theme.primaryBgColorBoxShadowActive,
});

export const ConnectKitProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <CKProvider
      theme="midnight"
      customTheme={getCustomTheme(theme)}
      options={{
        disclaimer: (
          <>
            By connecting your wallet you agree to the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/"
            >
              Privacy Policy
            </a>
          </>
        ),
      }}
    >
      {children}
    </CKProvider>
  );
};
