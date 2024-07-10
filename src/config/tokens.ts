import { sepolia, polygonAmoy } from 'viem/chains';
import { ERC20Token } from '@/types';

const DAI_SEPOLIA: ERC20Token = {
  name: 'DAI',
  decimals: 18,
  symbol: 'DAI',
  address: '0x1D70D57ccD2798323232B2dD027B3aBcA5C00091',
  chainId: sepolia.id,
};

const DAI_AMOY: ERC20Token = {
  name: 'LINK',
  decimals: 18,
  symbol: 'LINK',
  address: '0x0fd9e8d3af1aaee056eb9e802c3a762a667b1904',
  chainId: polygonAmoy.id,
};

const USDC_SEPOLIA: ERC20Token = {
  name: 'USDC',
  decimals: 6,
  symbol: 'USDC',
  address: '0xC891481A0AaC630F4D89744ccD2C7D2C4215FD47',
  chainId: sepolia.id,
};

const USDC_AMOY: ERC20Token = {
  name: 'USDC',
  decimals: 6,
  symbol: 'USDC',
  address: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582',
  chainId: polygonAmoy.id,
};

export const DAI: { [chainId: number]: ERC20Token } = {
  [sepolia.id]: DAI_SEPOLIA,
  [polygonAmoy.id]: DAI_AMOY,
};

export const USDC: { [chainId: number]: ERC20Token } = {
  [sepolia.id]: USDC_SEPOLIA,
  [polygonAmoy.id]: USDC_AMOY,
};
