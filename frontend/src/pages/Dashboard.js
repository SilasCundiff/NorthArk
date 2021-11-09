import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useAuthorizedContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuthorizedContext();
  return (
    <div>
      <Container>
        <Paper elevation={3}>

          <Box sx={{width: '100%', padding: '16px'}}>

            <h2>Hello, {user.displayName}</h2>

          </Box>
          
        </Paper>
      </Container>
    </div>
  )
};

export default Dashboard;
