import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export const LoggedInButtons = () => {
    const navigate = useNavigate();
    return(
        <div className='jumboButtons d-flex justify-content-center'>
            <Button className='jumboButton1' variant='contained' onClick={()=>{navigate('/dashboard')}}>Dashboard</Button>
            <Button className='jumboButton2' variant='contained' onClick={()=>{navigate('/reports')}}>Reports</Button>
        </div>
    )
}