import { erc20Abi } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { AddressStringType } from '@/types';

type Props = {
  contractAddress: AddressStringType; // The address of the token contract
  from?: AddressStringType; // The address of the token owner (optional)
  to?: AddressStringType; // The address of the spender (optional)
};

/**
 * Custom hook to get the token allowance for a given contract, owner, and spender.
 * @param param0 - An object containing the contractAddress, from (owner's address), and to (spender's address).
 * @returns The allowance of tokens that the spender is allowed to spend from the owner's account.
 */
export const useGetTokenAllowance = ({ contractAddress, from, to }: Props) => {
  // Get the current chain ID
  const chainId = useChainId();

  // Get the current account information
  const account = useAccount();

  // Determine the from address (default to the current account's address if not provided)
  const fromAddress = from ?? account.address;

  // Determine the to address
  const toAddress = to;

  // Use the useReadContract hook to read the allowance from the contract
  const { data: allowance, refetch } = useReadContract({
    address: contractAddress, // The address of the ERC20 token contract
    abi: erc20Abi, // The ABI of the ERC20 token contract
    functionName: 'allowance', // The function to call on the contract
    chainId, // The chain ID to interact with
    args: fromAddress && toAddress ? [fromAddress, toAddress] : undefined, // The arguments for the allowance function
  });

  // Return the allowance data
  return { allowance, refetch };
};
