import React, { useState, useMemo } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import NortharkFullImg from './assets/NorthArk_TypeLogo.png';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthorizedProvider } from './context/AuthContext';
import { blue, grey } from '@mui/material/colors';
import { Container, Paper } from '@mui/material';
import { ThemeToggler } from './components/ThemeToggler';
import { ColorModeProvider } from './context/ColorModeContext';
import { Box } from '@mui/system';
function App() {
  const [auth, setAuth] = useState(false);
  const [mode, setMode] = useState('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: blue[700],
                },
                background: {
                  default: blue[50],
                  paper: grey[100],
                },
              }
            : {
                primary: { main: blue[200] },
                background: {
                  default: grey[900],
                  paper: grey[900],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <AuthorizedProvider value={{ auth, setAuth }}>
      <ColorModeProvider setMode={setMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <img alt='Northark Logo' className='tempNorthArkImg' src={NortharkFullImg} />
              <ThemeToggler />
            </Box>

            <Paper elevation={3}>
              <Box sx={{ width: '100%', height: 300, padding: '16px' }}>
                {/*basic logic for changing app based on authorization state (logged in or out)*/}
                {/*checks the value of auth (true or false) and renders either the login or logout button*/}
                {auth ? <p>Logged In.</p> : <p>Logged Out.</p>}
                {/* in future this would return multiple components, or an entire page/pages, rather than just the different login/out buttons */}
                {auth ? <LogoutButton /> : <LoginButton />}
              </Box>
            </Paper>
          </Container>
        </ThemeProvider>
      </ColorModeProvider>
    </AuthorizedProvider>
  );
}

export default App;
