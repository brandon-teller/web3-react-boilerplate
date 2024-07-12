import { styled } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';

import { TargetWalletSelection, TokenTransferCard } from '@/containers';
import { DAI, USDC } from '@/config/tokens';
import { useAccount } from 'wagmi';
import { SUPPORTED_CHAINS } from '@/utils';
import { useChainModal } from '@rainbow-me/rainbowkit';

export const Landing = () => {
  const { chainId } = useAccount();

  const { openChainModal } = useChainModal();

  const isWrongNetwork = chainId && !SUPPORTED_CHAINS.includes(chainId);

  return (
    <LandingContainer data-testid='wonderland-challenge'>
      {isWrongNetwork ? (
        <Stack gap={1}>
          You are in wrong network.&nbsp;
          <Button variant='contained' onClick={openChainModal}>
            Switch Network
          </Button>
        </Stack>
      ) : (
        <>
          <TargetWalletSelection />
          <TransactionContainer>
            <TokenTransferCard token={DAI} />
            <TokenTransferCard token={USDC} />
          </TransactionContainer>
        </>
      )}
    </LandingContainer>
  );
};

const LandingContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: `calc(100vh - 5rem)`,
  padding: '0 8rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: '67.5rem',
  '@media (max-width: 1080px)': {
    width: '100%',
    padding: '0 1rem',
  },
  '@media (max-width: 768px)': {
    justifyContent: 'start',
  },
});

const TransactionContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  gap: '2rem',
  marginTop: '2rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});
