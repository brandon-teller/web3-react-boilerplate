import BigNumber from 'bignumber.js';

/**
 * Function to convert a big number (bigint or string) to a number with specified decimals
 * @param bn The bigInt to convert (can be bigint or string)
 * @param decimals Decimals of the bigint
 * @returns Converted number
 */
export const bnToNum = (bn: bigint | string, decimals: number): number => {
  return BigNumber(bn.toString())
    .shiftedBy(-1 * decimals)
    .toNumber();
};

/**
 * Function to convert a number (or string representation of a number) to a big number with specified decimals
 * @param number The number to convert (can be a number or a string)
 * @param decimals Number of decimal places to shift
 * @param roundingMode Rounding mode, default is to round down
 * @returns Converted bigint as string
 */
export const numToBn = (
  number: number | string,
  decimals: number,
): bigint => {
  return BigInt(BigNumber(number).shiftedBy(decimals).toFixed(0).toString());
};
