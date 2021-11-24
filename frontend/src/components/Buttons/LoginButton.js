import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSignInWithGoogle } from '../../lib/hooks';
import { useNavigate } from 'react-router';
import { FormControl, InputLabel, InputAdornment, FilledInput } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LoginButton = () => {
  /* login modal state handlers */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const signInWithGoogle = useSignInWithGoogle();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.log(err);
    } finally {
      navigate('/dashboard');
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const auth = getAuth();

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        className={window.location.pathname === '/' ? 'jumboButton1' : 'navButton'}
        variant='contained'
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'>
        <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
          <div className='registerForm d-flex flex-column'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='filled'>
              <InputLabel htmlFor='filled-email'>Email</InputLabel>
              <FilledInput id='filled-email' type='email' value={values.email} onChange={handleChange('email')} />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='filled'>
              <InputLabel htmlFor='filled-adornment-password'>Password</InputLabel>
              <FilledInput
                id='filled-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant='contained'
              onClick={() => {
                handleEmailLogin();
              }}
            >
              Login
            </Button>
          </div>

          <Typography sx={{ margin: '25px 0 10px 0' }} id='modal-modal-title' variant='h6' component='h2'>
            Or sign in with your Google account.
          </Typography>
          <Button sx={{ width: '238.5px', margin: '15px auto' }} variant='contained' onClick={handleLogin}>
            <GoogleIcon />
          </Button>

          <div>
            <Button variant='contained' onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginButton;
