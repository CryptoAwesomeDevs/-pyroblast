import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-gas-reporter';
import { constants } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const SEPOLIA_BLAST_API_URL = process.env.SEPOLIA_BLAST_API_URL || constants.HashZero;
const BLAST_SEPOLIA_PRIVATE_KEY = process.env.BLAST_SEPOLIA_PRIVATE_KEY || constants.HashZero;

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.19",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.13",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        hardhat: {},
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        blast_sepolia: {
            url: 'https://sepolia.blast.io',
            accounts: [BLAST_SEPOLIA_PRIVATE_KEY]
        },
    },
    gasReporter: {
        currency: 'USD',
        gasPrice: 15,
        coinmarketcap: process.env.COINMARKETCAP_KEY,
        enabled: true,
    },
    etherscan: {
        apiKey: {
            blast_sepolia: "blast_sepolia",
        },
        customChains: [
            {
                network: "blast_sepolia",
                chainId: 168587773,
                urls: {
                    apiURL: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
                    browserURL: "https://testnet.blastscan.io"
                }
            }
        ],
    },
};

export default config;
