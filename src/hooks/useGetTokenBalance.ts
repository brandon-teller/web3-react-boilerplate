import { erc20Abi } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { AddressStringType } from '@/types';

type Props = {
  contractAddress: AddressStringType; // The address of the token contract
  address?: AddressStringType; // The address to get the token balance for (optional)
};

/**
 * Custom hook to get the token balance for a given contract and address.
 * @param param0 - An object containing the contractAddress and address (target address).
 * @returns The token balance of the specified address.
 */
const useGetTokenBalance = ({ contractAddress, address }: Props) => {
  // Get the current chain ID
  const chainId = useChainId();

  // Get the current account information
  const account = useAccount();

  // Determine the target address (default to the current account's address if not provided)
  const targetAddress = address ?? account.address;

  // Use the useReadContract hook to read the balance from the contract
  const { data: balance } = useReadContract({
    address: contractAddress, // The address of the ERC20 token contract
    abi: erc20Abi, // The ABI of the ERC20 token contract
    functionName: 'balanceOf', // The function to call on the contract
    chainId, // The chain ID to interact with
    args: targetAddress ? [targetAddress] : undefined, // The arguments for the balanceOf function
    query: {
      refetchInterval: 1000, // Refetch the data every 1000 milliseconds (1 second)
    },
  });

  // Return the balance data
  return balance;
};

export default useGetTokenBalance;
