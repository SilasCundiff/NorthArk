import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useAuthorizedContext } from '../context/AuthContext';

//the actual contents of the dashboard. The Dashboard page uses this to conditionally render the dashboard contents

export const DashboardComp = () => {
    const { user } = useAuthorizedContext();

    return (
      <div>
        <Container>
          <Paper elevation={3}>
  
            <Box sx={{width: '100%', padding: '16px'}}>
  
              <h2>Hello, {user.displayName.split(' ')[0]}.</h2>
  
            </Box>
  
          </Paper>
        </Container>
      </div>
    )
};