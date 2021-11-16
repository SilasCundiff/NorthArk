import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { EmailChange } from './EmailChange';
import { DeleteAccount } from './DeleteAccount';
import { NavigationButtons } from './NavigationButtons';
import { PasswordChange } from './PasswordChange';

//the actual contents of the settings page

export const SettingsComp = () => {

    return (
      <>
        <h1 className='pageTitle' sx={{marginTop:'10px'}}>Settings</h1>
        <Container>
          <Paper elevation={3}>
            <Box sx={{width: '100%', padding: '16px'}}>
              <NavigationButtons />
              <div className='d-flex flex-column align-items-center'>
                  <EmailChange />
                  <PasswordChange />
                  <DeleteAccount />
              </div>
            </Box>
          </Paper>
        </Container>
      </>
    )
};