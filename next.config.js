/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const { sharedConfig } = require('./shared.config');

const baseApiPrefix = '/api';
const baseApiRoutes = [
  '/price/historical',
  '/price/historical-testnet',
  '/price/last',
  '/price/last-testnet',
  '/tracking/event',
  '/tournament/balances',
];

const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      ...baseApiRoutes.map((source) => ({
        source: `${baseApiPrefix}${source}`,
        destination: `${sharedConfig.apiBaseUrl}${source}`,
      })),
    ];
  },
};

module.exports = nextConfig;
