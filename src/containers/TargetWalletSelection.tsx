import { Stack, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { isAddress } from 'viem';
import { Input } from '@/components';
import { useStateContext } from '@/hooks';
import { AddressStringType } from '@/types';
import { red } from '@mui/material/colors';

export const TargetWalletSelection = () => {
  const { setTargetAddress } = useStateContext();
  const [input, setInput] = useState<string>('');

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const isValidAddress = useMemo(() => input && isAddress(input), [input]);

  useEffect(() => {
    if (isValidAddress) {
      setTargetAddress(input as AddressStringType);
    } else {
      setTargetAddress(undefined);
    }
  }, [isValidAddress, input, setTargetAddress]);

  return (
    <Container>
      <SBox flex={1}>
        <Typography>Target Address: </Typography>
        <Stack direction='column' gap={0.5} flex={1}>
          <Input error={!isValidAddress} value={input} onChange={handleInputChange} />
          {!isValidAddress && <Error>Enter a valid address</Error>}
        </Stack>
      </SBox>
    </Container>
  );
};

const Container = styled(Box)(() => ({
  width: '100%',
  maxWidth: '40rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
}));

const SBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
}));

const Error = styled(Typography)(() => ({
  marginLeft: '0.5rem',
  fontSize: '0.75rem',
  color: red[500],
}));
