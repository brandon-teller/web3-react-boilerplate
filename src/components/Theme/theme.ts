import { Theme } from '@/types';

export const darkTheme: Theme = {
  type: 'dark',
  titleColor: '#000000',
  textPrimary: '#ffffff',
  textSecondary: '#99A4B8',
  backgroundPrimary: '#000000',
  backgroundSecondary: '#161616',
  titleFontFamily: 'Open Sans',
  textFontFamily: 'Open Sans',
  borderRadius: '0.8rem',
  secondaryBorderRadius: '0.4rem',
  border: '0.1rem solid rgba(153, 164, 184, 0.1)',
  inputBorder: '1px solid #344054',
  inputErrorBorder: '1px solid rgb(211, 47, 47)',
};

export const lightTheme: Theme = {
  type: 'light',
  titleColor: '#000000',
  textPrimary: '#000000',
  textSecondary: '#717171',
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#f8f8f8',
  titleFontFamily: 'Open Sans',
  textFontFamily: 'Open Sans',
  borderRadius: '0.8rem',
  secondaryBorderRadius: '0.4rem',
  border: '0.1rem solid rgba(183, 183, 183, 0.3)',
  inputBorder: '1px solid #D0D5DD',
  inputErrorBorder: '1px solid rgb(211, 47, 47)',
};
