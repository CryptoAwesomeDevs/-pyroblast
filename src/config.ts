import { type Address, type Chain, createClient } from 'wagmi';
import { getDefaultClient } from 'connectkit';
import { sharedConfig } from '../shared.config';
import { blastSepolia } from 'app/utils/chains';

interface AppConfig {
  appName: string;
  showFaucet: boolean;
}

interface NetworkConfig {
  defaultChains: Chain[];
  factoryAddress: Address;
  apiKey: string;
  apiBaseUrl: string;
  isProd: boolean;
  faucetLink: string;
  appName: string;
  showFaucet: boolean;
}

const appConfig: AppConfig = {
  appName: 'PyroBlast',
  showFaucet: true,
};

type FullConfig = AppConfig & NetworkConfig;

const DEV_CONFIG: FullConfig = {
  defaultChains: [blastSepolia],
  factoryAddress: '0x3546CE3b997C7a1cb4D4B41A94574D2Dd6713ca1',
  apiKey: '17LTonWpUg0NtPC8cF8idmr9orOI1qkc',
  faucetLink: 'https://faucet.quicknode.com/blast/sepolia',
  ...sharedConfig,
  ...appConfig,
};
export const config = DEV_CONFIG;

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: config.appName,
    chains: config.defaultChains,
  })
);
