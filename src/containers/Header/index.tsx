import { ConnectButton } from '@rainbow-me/rainbowkit';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useCustomTheme } from '@/hooks/useTheme';
import { zIndex, HEADER_HEIGHT } from '@/utils';

export const Header = () => {
  const { changeTheme, theme } = useCustomTheme();

  return (
    <StyledHeader>
      <Logo>Challenge</Logo>
      <Buttons>
        <ConnectButton />
        <IconButton onClick={changeTheme}>{theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}</IconButton>
      </Buttons>
    </StyledHeader>
  );
};

//Styles
const StyledHeader = styled('header')(() => {
  return {
    display: 'flex',
    height: `${HEADER_HEIGHT}rem`,
    padding: '0 2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: zIndex.HEADER,
    width: '100%',
    maxWidth: '67.5rem',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
    },
  };
});

const Logo = styled('h1')({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const Buttons = styled('div')({
  display: 'flex',
  gap: '2rem',
});
