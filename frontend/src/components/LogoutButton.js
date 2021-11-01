import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
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

const LogoutButton = (params) => {

    {/* logout confirmation modal state handlers */}
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Logout</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'>

                <Box sx={modalStyle} className='d-flex align-items-center flex-column'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Really Logout?
                    </Typography> 
                    <div className='modalButtons'>
                        {/*simple auth changing for testing, will be more secure and based on actually checking login info when that system is in place*/}
                        <Button variant="contained" onClick={()=>{params.setAuth(false)}}>Logout</Button>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default LogoutButton;