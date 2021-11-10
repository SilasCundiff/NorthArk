import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';

export const NotLoggedIn = () => {

    return (
      <div>
        <Container>
          <Paper elevation={3}>
  
            <Box sx={{width: '100%', padding: '16px'}}>
  
              <p>Please log in to your account.</p>
  
            </Box>
  
          </Paper>
        </Container>
      </div>
    )
};