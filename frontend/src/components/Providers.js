import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizedProvider } from '../context/AuthContext';
import { ColorModeProvider } from '../context/ColorModeContext';
import { useTheme } from '../lib/hooks';

const Providers = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [mode, setMode] = useState('dark');

  const theme = useTheme(mode);

  return (
    <AuthorizedProvider value={{ auth, setAuth }}>
      <ColorModeProvider setMode={setMode}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </ColorModeProvider>
    </AuthorizedProvider>
  );
};

export default Providers;
