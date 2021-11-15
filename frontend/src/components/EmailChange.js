import { useAuthorizedContext } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const formCSS = {
    width: '100%',
    maxWidth: '450px',
    margin: '5px 0'
};

export const EmailChange = () => {
    const { user } = useAuthorizedContext();

    return (
        <div className='d-flex flex-column'>
            <h2 className='settingsTitles'>Change Email</h2>
            <TextField sx={formCSS} id="enterEmail" label="New Email Address" variant="outlined" />
            <TextField sx={formCSS} id="confirmEmail" label="Confirm Email Address" variant="outlined" />
        </div>
    )
}