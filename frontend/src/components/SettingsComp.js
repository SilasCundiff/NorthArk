import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { EmailChange } from './EmailChange';

//the actual contents of the settings page

export const SettingsComp = () => {

    return (
      <>
        <h1 className='pageTitle' sx={{marginTop:'10px'}}>Settings</h1>
        <Container>
          <Paper elevation={3}>
  
            <Box sx={{width: '100%', padding: '16px'}}>

                <EmailChange />
  
            </Box>
  
          </Paper>
        </Container>
      </>
    )
};