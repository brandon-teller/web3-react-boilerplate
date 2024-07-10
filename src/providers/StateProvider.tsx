import { createContext, useState } from 'react';
import { AddressStringType } from '@/types';

type ContextType = {
  targetAddress: AddressStringType | undefined;
  setTargetAddress: (val: AddressStringType) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const [targetAddress, setTargetAddress] = useState<AddressStringType>();

  return (
    <StateContext.Provider
      value={{
        targetAddress,
        setTargetAddress,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
