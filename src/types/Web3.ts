// Type definition for Ethereum addresses, represented as strings that start with '0x'
export type AddressStringType = `0x${string}`;

// Type definition for an ERC20 token
export type ERC20Token = {
  name: string; // The name of the token (e.g., "Dai Stablecoin")
  decimals: number; // The number of decimal places the token uses
  symbol: string; // The symbol of the token (e.g., "DAI")
  address: AddressStringType; // The contract address of the token
  chainId: number; // The chain ID where the token is deployed (e.g., 1 for Ethereum mainnet)
};

// Type definition for mapping chain IDs to ERC20 tokens
export type ERC20TokenByChain = { [chainId: number]: ERC20Token };
