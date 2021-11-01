import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuthorizedContext } from '../context/AuthContext';

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

const LoginButton = (params) => {
  // Destructure setAuth from the context
  const { setAuth } = useAuthorizedContext();

  /* login modal state handlers */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Login
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'>
        <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Please enter your login information. (form to come later this is just for basic logic implementation)
          </Typography>
          <div className='modalButtons'>
            {/*simple auth changing for testing, will be more secure and based on actually checking login info when that system is in place*/}
            <Button
              variant='contained'
              onClick={() => {
                setAuth(true);
              }}
            >
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
