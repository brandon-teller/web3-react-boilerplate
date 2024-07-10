import type { ReactNode } from 'react';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { config } from '../utils';
import { useCustomTheme } from '@/hooks/useTheme';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function WalletProvider({ children }: Props) {
  const { theme } = useCustomTheme();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize='compact' theme={theme === 'light' ? lightTheme() : darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
