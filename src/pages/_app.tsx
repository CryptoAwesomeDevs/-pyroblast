import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { WagmiConfig } from 'wagmi';
import { client, config } from 'app/config';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { defaultTheme } from 'app/theme';
import { AppBar } from 'app/components/layout/AppBar';
import { ConnectKitProvider } from 'app/providers/ConnectKitProvider';
import { IntlProvider } from 'react-intl';

const GlobalStyle = createGlobalStyle(({ theme }) => ({
  html: {
    height: '100%',
    '::-webkit-scrollbar': {
      background: 'transparent',
      width: 5,
    },

    '::-webkit-scrollbar-thumb': {
      background: theme.colorPrimary,
      borderRadius: 3,
    },
  },
  body: {
    background: theme.bgColorSecondary,
    color: theme.colorSecondary,
    fontFamily: theme.primaryFont,
    height: '100%',
  },
  '#__next': {
    height: '100%',
  },
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
}));

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig client={client}>
      <ThemeProvider theme={defaultTheme}>
        <ConnectKitProvider>
          <IntlProvider locale="en">
            <GlobalStyle />
            <NextHead>
              <title>{config.appName}</title>
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon.ico"
              />
            </NextHead>
            {mounted && (
              <>
                <AppBar />
                <Component {...pageProps} />
              </>
            )}
          </IntlProvider>
        </ConnectKitProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}
