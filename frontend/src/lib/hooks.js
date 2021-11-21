import { useMemo, useState, useEffect, useCallback } from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import { auth, googleAuthProvider } from '../utils/firebase';
import { createUserInFirebase } from './firestore';
import axios from 'axios';

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

export const useSignInWithGoogle = () => {
  return async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
      createUserInFirebase(auth.currentUser);
    } catch (err) {
      console.log(err);
    }
  };
};

export const useSignOutUser = () => {
  return () => auth.signOut();
};

export const useAxiosWithAuth = ({ endpoint, method, body = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const fetchData = useCallback(async () => {
    setStatus('pending');

    // Every request to our server requires an auth token
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.parse(body),
    };

    axios[method](`http://localhost:8080/api/${endpoint}`, config)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setStatus('rejected');
        setError(err);
      })
      .finally(() => {
        setStatus('resolved');
      });
  }, [body, method, endpoint]);

  useEffect(() => {
    fetchData();
  }, [endpoint, method, body, fetchData]);

  return { response, error, status };
};
