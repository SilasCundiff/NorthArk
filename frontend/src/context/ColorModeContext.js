import { createContext, useContext, useMemo } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ColorModeProvider = ({ children, setMode }) => {
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return <ColorModeContext.Provider value={colorMode}>{children}</ColorModeContext.Provider>;
};

const useColorModeContext = () => {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error('useAuthorizedContext must be used within a UserAuthProvider');
  }

  return context;
};

export { useColorModeContext, ColorModeProvider };
