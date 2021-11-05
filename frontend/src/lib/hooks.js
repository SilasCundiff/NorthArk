import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const useTheme = (mode) => {
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

  return theme;
};
