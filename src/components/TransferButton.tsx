import { Button, CircularProgress, styled } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { BaseError, erc20Abi, zeroAddress } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useGetTokenAllowance, useGetTokenBalance } from '@/hooks';
import { AddressStringType, ERC20Token } from '@/types';

enum ERROR_CODES {
  INSUFFICIENT_BALANCE = 'No enough funds',
  INSUFFICIENT_ALLOWANCE = 'Need to approve first.',
}

type TransferButtonProps = {
  token: ERC20Token;
  targetAddress?: AddressStringType;
  amount: bigint;
  onUpdateError: (msg: string) => void;
  disabled?: boolean;
};

export const TransferButton = ({
  token,
  targetAddress,
  amount,
  onUpdateError,
  disabled = false,
}: TransferButtonProps) => {
  const { allowance } = useGetTokenAllowance({
    contractAddress: token.address,
    to: targetAddress,
  });
  const { balance, refetch: refetch } = useGetTokenBalance({ contractAddress: token.address });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isPendingTransfer = isPending || isConfirming;

  const handleTransfer = useCallback(() => {
    onUpdateError('');

    if (!balance || amount > balance) {
      onUpdateError(ERROR_CODES.INSUFFICIENT_BALANCE);
    } else if (amount > (allowance || 0n)) {
      onUpdateError(ERROR_CODES.INSUFFICIENT_ALLOWANCE);
    } else {
      writeContract({
        address: token.address,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [targetAddress ?? zeroAddress, amount],
      });
    }
  }, [onUpdateError, balance, amount, allowance, writeContract, token.address, targetAddress]);

  useEffect(() => {
    if (!error) {
      onUpdateError('');
      return;
    }
    onUpdateError((error as BaseError).shortMessage || error.message);
  }, [onUpdateError, error]);

  // If transaction confirmed, then manually refetch balance data
  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, refetch]);

  return (
    <SButton
      variant='contained'
      size='small'
      onClick={handleTransfer}
      disabled={disabled || !targetAddress || isPendingTransfer || !amount || amount === 0n}
    >
      {isPendingTransfer ? <CircularProgress size={16} /> : 'Transfer'}
    </SButton>
  );
};

const SButton = styled(Button)({
  flex: 1,
  height: '2.5rem',
  alignItems: 'center',
});
