import { createContext, useContext } from 'react';

// Define the context
const AuthorizedContext = createContext(null);

// This is a provider component.
// Any child components wrapped in this component will have access to the value prop
const AuthorizedProvider = ({ children, value }) => {
  return <AuthorizedContext.Provider value={value}>{children}</AuthorizedContext.Provider>;
};

// Custom hook to allow you to access the contexts values by importing this hook
const useAuthorizedContext = () => {
  const context = useContext(AuthorizedContext);

  if (context === undefined) {
    throw new Error('useAuthorizedContext must be used within a UserAuthProvider');
  }

  return context;
};

export { AuthorizedProvider, useAuthorizedContext };
