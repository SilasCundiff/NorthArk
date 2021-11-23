import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getAuth, createUserWithEmailAndPassword, updateProfile, updateEmail } from 'firebase/auth';
import { useSignInWithGoogle } from '../lib/hooks';
import { useNavigate } from 'react-router';
import { FormControl, InputLabel, InputAdornment, FilledInput } from '@mui/material';
import { firestore } from '../utils/firebase';
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

const notMatchingText = <p className='text-center'>Passwords must match.</p>;
const passwordsNotLongEnough = <p className='text-center'>Password must be at least 6 characters.</p>;
const enterADisplayName = <p className='text-center'>Display name must be at least 6 characters.</p>;

const RegisterButton = () => {
  /* login modal state handlers */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    showPassword: false,
  });

  const navigate = useNavigate();
  const signInWithGoogle = useSignInWithGoogle();

  const auth = getAuth();

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

  // this is pretty messy but it works
  const handleRegister = async () => {
    let regex = /\S+@\S+\.\S+/;
    if (regex.test(values.email) && values.password === values.password2 && values.username.length >= 5) {
      //  creates the user than updates their display name and email to match those they registered with
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          updateProfile(userCredential.user, { displayName: values.username })
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });

          updateEmail(userCredential.user, values.email)
          
          firestore.doc(`users/${userCredential.user.uid}`).get().then((docSnapshot) => {
              //add user data
              firestore.doc(`users/${userCredential.user.uid}`).set({
                accounts: [],
                email: values.email,
                displayName: values.username
              });
              // then navigates to the dashboard after registering
            
              navigate('/');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Button className='navButton' variant='contained' onClick={handleOpen}>
        Register
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'>
        <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
          <Typography sx={{ marginBottom: '15px' }} id='modal-modal-title' variant='h6' component='h2'>
            Register with Email and Password
          </Typography>

          <div className='registerForm d-flex flex-column align-items-center'>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='filled'>
              <InputLabel htmlFor='filled-email'>Email</InputLabel>
              <FilledInput id='filled-email' type='email' value={values.email} onChange={handleChange('email')} />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='filled'>
              <InputLabel htmlFor='filled-username'>Display name</InputLabel>
              <FilledInput
                id='filled-username'
                type='text'
                value={values.username}
                onChange={handleChange('username')}
              />
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
            <FormControl sx={{ m: 1, width: '25ch' }} variant='filled'>
              <InputLabel htmlFor='filled-adornment-password'>Confirm Password</InputLabel>
              <FilledInput
                id='filled-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password2}
                onChange={handleChange('password2')}
              />
            </FormControl>{' '}
            <br />
            {values.password !== values.password2 ? notMatchingText : ''}
            <br />
            {values.password.length < 6 ? passwordsNotLongEnough : ''}
            <br />
            {values.username.length < 6 ? enterADisplayName : ''}
            <Button
              variant='contained'
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </Button>
          </div>

          <div className='d-flex flex-column'>
            <Typography sx={{ margin: '25px 0 10px 0' }} id='modal-modal-title' variant='h6' component='h2'>
              Or sign in with your Google account.
            </Typography>
            <Button sx={{ width: '238.5px', margin: 'auto' }} variant='contained' onClick={handleLogin}>
              <GoogleIcon />
            </Button>
          </div>
          <div className='modalButtons'>
            <Button variant='contained' onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterButton;
