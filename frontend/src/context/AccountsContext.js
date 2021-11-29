import { createContext, useContext } from 'react';

// Define the context
const AccountsContext = createContext(null);

// This is a provider component.
// Any child components wrapped in this component will have access to the value prop
const AccountsProvider = ({ children, value }) => {
  return <AccountsContext.Provider value={value}>{children}</AccountsContext.Provider>;
};

// Custom hook to allow you to access the contexts values by importing this hook
const useAccountsContext = () => {
  const context = useContext(AccountsContext);

  if (context === undefined) {
    throw new Error('useAccountsContext must be used within a AccountsProvider');
  }

  return context;
};

export { AccountsProvider, useAccountsContext };
