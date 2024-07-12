import { Button, CircularProgress, styled } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { BaseError, erc20Abi, zeroAddress } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { AddressStringType, ERC20Token } from '@/types';
import { useGetTokenAllowance } from '@/hooks';

type ApproveButtonProps = {
  token: ERC20Token;
  targetAddress?: AddressStringType;
  amount: bigint;
  onUpdateError: (msg: string) => void;
};

export const ApproveButton = ({ token, targetAddress, amount, onUpdateError }: ApproveButtonProps) => {
  const { refetch } = useGetTokenAllowance({ contractAddress: token.address, to: targetAddress });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isPendingApproval = isPending || isConfirming;

  const handleApprove = useCallback(() => {
    onUpdateError('');

    writeContract({
      address: token.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [targetAddress ?? zeroAddress, amount],
    });
  }, [onUpdateError, writeContract, token.address, targetAddress, amount]);

  useEffect(() => {
    if (!error) {
      onUpdateError('');
      return;
    }
    onUpdateError((error as BaseError).shortMessage || error.message);
  }, [error, onUpdateError]);

  // If transaction confirmed, then manually refetch allowance data
  useEffect(() => {
    if (isConfirmed) {
      console.log('refetching...');
      refetch();
    }
  }, [isConfirmed, refetch]);

  return (
    <SButton
      variant='contained'
      size='small'
      onClick={handleApprove}
      disabled={!targetAddress || isPendingApproval || !amount || amount === 0n}
    >
      {isPendingApproval ? <CircularProgress size={16} /> : 'Approve'}
    </SButton>
  );
};

const SButton = styled(Button)({
  flex: 1,
  height: '2.5rem',
  alignItems: 'center',
});
