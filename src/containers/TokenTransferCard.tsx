import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Box, Button, Typography, styled } from '@mui/material';
import { ERC20TokenByChain } from '@/types';
import { useAccount, useChainId } from 'wagmi';
import { useCallback, useEffect, useState } from 'react';
import { useStateContext, useGetTokenAllowance, useGetTokenBalance } from '@/hooks';
import { ApproveButton, TransferButton, MintButton, DecimalInput } from '@/components';
import { bnToNum, numToBn } from '@/utils/bigNumber';
import { useConnectModal } from '@rainbow-me/rainbowkit';

type TokenTransferCardProps = {
  token: ERC20TokenByChain;
};

enum ERRORS {
  INVALID_AMOUNT = 'Enter a valid token amount',
  NO_FUNDS = 'Not Enough Funds',
  NEED_APPROVE = 'Need to approve token first',
}

export const TokenTransferCard = ({ token: tokenByChain }: TokenTransferCardProps) => {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const { targetAddress } = useStateContext();

  const token = tokenByChain[chainId];

  const [amount, setAmount] = useState<string>();

  const handleAmountChange = useCallback((value: string) => {
    setAmount(value);
  }, []);

  const bigIntAmount = numToBn(amount || 0, token.decimals);

  const { allowance } = useGetTokenAllowance({ contractAddress: token.address, to: targetAddress });
  const { balance } = useGetTokenBalance({ contractAddress: token.address });

  const [error, setError] = useState('');

  const isExceedBalance = !balance || bigIntAmount > balance;
  const isExceedAllownace = !allowance || bigIntAmount > allowance;

  useEffect(() => {
    if (!amount) {
      setError(ERRORS.INVALID_AMOUNT);
    } else if (isExceedAllownace) {
      setError(ERRORS.NEED_APPROVE);
    } else if (isExceedBalance) {
      setError(ERRORS.NO_FUNDS);
    } else {
      setError('');
    }
  }, [amount, isExceedAllownace, isExceedBalance]);

  return (
    <SCard variant='outlined'>
      <CardContent>
        <Box display='flex' gap={2} flexDirection='column'>
          <Box display='flex' gap={1} alignItems='center'>
            <Typography>
              Token:&nbsp;<b>{token.name}</b>
            </Typography>
            {isConnected && <MintButton token={token} amount={numToBn(100, token.decimals)} />}
          </Box>
          <Typography>
            Balance:&nbsp;
            <b>
              {bnToNum(balance || 0n, token.decimals)} {token.symbol}
            </b>
          </Typography>
          <Typography>
            Allowance:&nbsp;
            <b>
              {bnToNum(allowance || 0n, token.decimals)} {token.symbol}
            </b>
          </Typography>
          <Box display='flex' alignItems='center' gap={2}>
            <Typography>Amount:</Typography>
            <DecimalInput value={amount} onChange={(v = '') => handleAmountChange(v)} placeholder='0' />
          </Box>
        </Box>
      </CardContent>
      {isConnected ? (
        <Box>
          <Box display='flex' alignItems='center' gap={1}>
            <ApproveButton token={token} targetAddress={targetAddress} amount={bigIntAmount} onUpdateError={setError} />
            <TransferButton
              token={token}
              targetAddress={targetAddress}
              amount={bigIntAmount}
              onUpdateError={setError}
              disabled={isExceedAllownace || isExceedBalance}
            />
          </Box>
          <ErrorLabel test-id='transaction-error-msg'>{error}</ErrorLabel>
        </Box>
      ) : (
        <Button variant='contained' onClick={openConnectModal} sx={{ width: '100%' }}>
          Connect Wallet
        </Button>
      )}
    </SCard>
  );
};

const SCard = styled(Card)({
  flex: 1,
  padding: '1rem',
});

const ErrorLabel = styled(Typography)({
  color: 'red',
  textAlign: 'center',
  fontSize: '0.75rem',
  marginTop: '0.5rem',
});
