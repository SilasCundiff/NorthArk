import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export const PasswordChange = () => {
    /* modal state handlers */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='d-flex flex-column'>
            <Button sx={{margin:'30px 0 5px 0', maxWidth: '450px'}} variant='contained' onClick={handleOpen}>Change Password</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title'>
                <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Please contact the help desk to change your password.<br/><a href='tel:555-867-5309' target='_blank' rel="noreferrer">(555)867-5309</a><br/><a href='mailto: NorthArk@NorthArk.com' target='_blank' rel="noreferrer">NorthArk@NorthArk.com</a>
                    </Typography>
                    <div className='modalButtons'>
                        <Button variant='contained' onClick={handleClose}>
                        Cancel
                        </Button>
                    </div>
            </Box>
      </Modal>
        </div>  
    )
};
