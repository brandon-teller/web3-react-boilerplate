import { Button, CircularProgress, styled } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { WTAbi } from '@/contracts/abi/WTAbi';
import { ERC20Token } from '@/types';
import { useGetTokenBalance } from '@/hooks';

type MintButtonProps = {
  token: ERC20Token;
  amount: bigint;
};

export const MintButton = ({ token, amount }: MintButtonProps) => {
  const account = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();
  const { refetch } = useGetTokenBalance({ contractAddress: token.address });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const isPendingMint = isPending || isConfirming;

  const handleMint = useCallback(() => {
    writeContract({
      address: token.address,
      abi: WTAbi,
      functionName: 'mint',
      args: account.address ? [account.address, amount] : undefined,
    });
  }, [account.address, amount, token.address, writeContract]);

  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, refetch]);

  return (
    <SButton variant='outlined' size='small' onClick={handleMint} disabled={isPendingMint}>
      {isPendingMint ? <CircularProgress size={14} /> : 'Mint'}
    </SButton>
  );
};

const SButton = styled(Button)({
  height: '2rem',
  alignItems: 'center',
  fontStyle: 'italic',
  lineHeight: '0.5rem',
});
