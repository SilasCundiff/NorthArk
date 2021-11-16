import { useAuthorizedContext } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { updateEmail } from 'firebase/auth';

const formCSS = {
    width: '100%',
    minWidth: '250px',
    maxWidth: '450px',
    margin: '5px 0'
};

export const EmailChange = () => {

    const { user } = useAuthorizedContext();

    const email=user.email;

    const [emailState,setEmailState] = useState(email);
    const [formState,setFormState] = useState({
        form1: '',
        form2: ''
    }); 

    const checkFormMatch = () => {
        if(formState.form1 !== formState.form2){
            return false;
        }
        return true;
    }

    const checkValidEmail = () => {
        let regex = /\S+@\S+\.\S+/;
        return regex.test(formState.form1)
    }

    const handleForm1Change = e => {
        setFormState({...formState,form1: e.target.value});
    }

    const handleForm2Change = e => {
        setFormState({...formState,form2: e.target.value});
    }

    const changeEmail = (user, email) => {
        if(checkFormMatch() && checkValidEmail()){
            updateEmail(user, email).then(() => {
                setEmailState(user.email);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            console.log('invalid change');
        }
    }

    return (
        <div className='d-flex flex-column emailChange'>
            <p>Current email: {emailState}</p>
            <h2 className='settingsTitles'>Change Email</h2>
            <TextField sx={formCSS} id="enterEmail" label="New Email Address" variant="outlined" 
                onChange={handleForm1Change}
            />
            <TextField sx={formCSS} id="confirmEmail" label="Confirm Email Address" variant="outlined" 
                onChange={handleForm2Change}
            />
            {checkFormMatch() ? '' : 'Emails must match'}
            <br/>
            {checkValidEmail() ? '' : 'Please enter a valid email'}
            <Button 
                variant='contained' 
                sx={formCSS}
                onClick={()=>{changeEmail(user,formState.form1)}}>
                    Submit
            </Button>
        </div>
    )
}