import { Constants } from '@/types';
import { DAI, USDC } from './tokens';

const constants: Constants = {
  tokens: {
    DAI,
    USDC,
  },
};

export const getConstants = (): Constants => {
  return constants;
};
