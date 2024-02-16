const isProd = process.env.NODE_ENV === 'production';
// const isProd = true;
// const isProd = false;

const sharedConfig = {
  isProd,
  apiBaseUrl: isProd ? 'https://api.pyroblast.io' : 'http://localhost:3001',
};

module.exports = { sharedConfig };
