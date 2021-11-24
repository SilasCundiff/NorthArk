import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import { useAuthorizedContext } from '../../context/AuthContext';
import { deleteUser } from 'firebase/auth';

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

export const DeleteAccount = () => {
  const { user } = useAuthorizedContext();
  const navigate = useNavigate();

  /* modal state handlers */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    deleteUser(user)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='d-flex flex-column'>
      <Button sx={{ margin: '30px 0 5px 0', maxWidth: '450px' }} variant='contained' color='error' onClick={handleOpen}>
        Delete Your Account
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'>
        <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Really delete your account? {<br />} This cannot be undone.
          </Typography>
          <div className='modalButtons'>
            <Button variant='contained' onClick={handleDelete}>
              Delete
            </Button>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
