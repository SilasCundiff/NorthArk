import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSignInWithGoogle } from '../lib/hooks';
import { useNavigate } from 'react-router';

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

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Login
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'>
        <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Please login with Google!
          </Typography>
          <div className='modalButtons'>
            <Button variant='contained' onClick={handleLogin}>
              Login
            </Button>
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
