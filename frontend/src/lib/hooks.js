import { useMemo, useState, useEffect, useCallback } from 'react';
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import { auth, googleAuthProvider } from './firebase';
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

export const useAxiosWithAuth = ({ endpoint, method, body = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const user = auth.currentUser;
  const fetchData = useCallback(async () => {
    if (!user) return;
    setStatus('pending');

    // Every request to our server requires an auth token

    const token = user && (await user.getIdToken());
    // TODO Remove later, used for testing bad token
    // const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    if (method === 'post') {
      axios
        .post(`http://localhost:8080/api/${endpoint}`, body, config)
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
    }

    if (method.toLowerCase === 'get') {
      axios
        .get(`http://localhost:8080/api/${endpoint}`, config)
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
    }
  }, [body, method, endpoint, user]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { response, error, status };
};
