import { renderHook, waitFor } from '@testing-library/react';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { useGetTokenBalance } from '@/hooks/useGetTokenBalance';
import { erc20Abi } from 'viem';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useChainId: jest.fn(),
  useReadContract: jest.fn(),
}));

const mockUseAccount = jest.mocked(useAccount);
const mockUseChainId = jest.mocked(useChainId);
const mockUseReadContract = jest.mocked(useReadContract);

describe('useGetTokenBalance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the token balance for the provided address', async () => {
    const mockChainId = 1;
    const mockAccount = { address: '0xAccountAddress' };
    const mockBalance = 1000000000000000000n; // 1 token in wei

    mockUseChainId.mockReturnValue(mockChainId);
    mockUseAccount.mockReturnValue({ address: mockAccount.address } as any);
    mockUseReadContract.mockReturnValue({
      data: mockBalance,
      refetch: jest.fn(),
    } as any);

    const { result } = renderHook(() =>
      useGetTokenBalance({
        contractAddress: '0xTokenAddress',
        address: '0xTargetAddress',
      }),
    );

    await waitFor(() => {
      expect(result.current.balance).toBe(mockBalance);
      expect(mockUseReadContract).toHaveBeenCalledWith({
        address: '0xTokenAddress',
        abi: erc20Abi,
        functionName: 'balanceOf',
        chainId: mockChainId,
        args: ['0xTargetAddress'],
      });
    });
  });

  it('should return the token balance for the current account address if no address is provided', async () => {
    const mockChainId = 1;
    const mockAccount = { address: '0xAccountAddress' };
    const mockBalance = 1000000000000000000n; // 1 token in wei

    mockUseChainId.mockReturnValue(mockChainId);
    mockUseAccount.mockReturnValue({ address: mockAccount.address } as any);
    mockUseReadContract.mockReturnValue({
      data: mockBalance,
      refetch: jest.fn(),
    } as any);

    const { result } = renderHook(() =>
      useGetTokenBalance({
        contractAddress: '0xTokenAddress',
      }),
    );

    await waitFor(() => {
      expect(result.current.balance).toBe(mockBalance);
      expect(mockUseReadContract).toHaveBeenCalledWith({
        address: '0xTokenAddress',
        abi: erc20Abi,
        functionName: 'balanceOf',
        chainId: mockChainId,
        args: ['0xAccountAddress'],
      });
    });
  });
});
