import React, {PropsWithChildren, useState} from 'react';

interface MainContextProps {
  isUpdated?: boolean;
  setIsUpdated: () => void;
}

const MainContext: React.Context<MainContextProps> =
  React.createContext<MainContextProps>({
    setIsUpdated: () => {},
  });

export const MainProvider: React.FC<PropsWithChildren<any>> = ({children}) => {
  const [isUpdated, setIsUpdated] = useState<boolean>();

  const updateState = () => {
    setIsUpdated(!isUpdated);
  };

  return (
    <MainContext.Provider
      value={{
        isUpdated,
        setIsUpdated: updateState,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = React.useContext(MainContext);

  if (!context) {
    throw new Error('useMain hook must be used inside MainProvider');
  }

  return context;
};
