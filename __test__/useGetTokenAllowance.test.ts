import { renderHook, waitFor } from '@testing-library/react';
import { useGetTokenAllowance } from '@/hooks/useGetTokenAllowance';
import { erc20Abi } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useChainId: jest.fn(),
  useReadContract: jest.fn(),
}));

const mockUseAccount = jest.mocked(useAccount);
const mockUseChainId = jest.mocked(useChainId);
const mockUseReadContract = jest.mocked(useReadContract);

describe('useGetTokenAllowance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the token allowance for the provided from and to addresses', async () => {
    const mockChainId = 1;
    const mockAccount = {
      address: '0xAccountAddress',
    };
    const mockAllowance = 5000000000000000000n; // 5 tokens in wei

    mockUseChainId.mockReturnValue(mockChainId);
    mockUseAccount.mockReturnValue(mockAccount as any);
    mockUseReadContract.mockReturnValue({
      data: mockAllowance,
      refetch: jest.fn(),
    } as any);

    const { result } = renderHook(() =>
      useGetTokenAllowance({
        contractAddress: '0xTokenAddress',
        from: '0xFromAddress',
        to: '0xToAddress',
      }),
    );

    await waitFor(() => {
      expect(result.current.allowance).toBe(mockAllowance);
      expect(mockUseReadContract).toHaveBeenCalledWith({
        address: '0xTokenAddress',
        abi: erc20Abi,
        functionName: 'allowance',
        chainId: mockChainId,
        args: ['0xFromAddress', '0xToAddress'],
      });
    });
  });

  it('should return the token allowance for the current account address if from address is not provided', async () => {
    const mockChainId = 1;
    const mockAccount = { address: '0xAccountAddress' };
    const mockAllowance = 5000000000000000000n; // 5 tokens in wei

    mockUseChainId.mockReturnValue(mockChainId);
    mockUseAccount.mockReturnValue(mockAccount as any);
    mockUseReadContract.mockReturnValue({
      data: mockAllowance,
      refetch: jest.fn(),
    } as any);

    const { result } = renderHook(() =>
      useGetTokenAllowance({
        contractAddress: '0xTokenAddress',
        to: '0xToAddress',
      }),
    );

    await waitFor(() => {
      expect(result.current.allowance).toBe(mockAllowance);
      expect(mockUseReadContract).toHaveBeenCalledWith({
        address: '0xTokenAddress',
        abi: erc20Abi,
        functionName: 'allowance',
        chainId: mockChainId,
        args: ['0xAccountAddress', '0xToAddress'],
      });
    });
  });
});
