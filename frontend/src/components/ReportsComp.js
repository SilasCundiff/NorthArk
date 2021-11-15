import { Container, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useAuthorizedContext } from '../context/AuthContext';
import { NavigationButtonsReports } from '../components/NavigationButtonsReports';

//the actual contents of the dashboard. The Dashboard page uses this to conditionally render the dashboard contents

export const ReportsComp = () => {
  const { user } = useAuthorizedContext();
  const firstName = user.displayName.split(' ')[0];

  return (
    <>
      <h1 className='pageTitle' sx={{ marginTop: '10px' }}>
        {firstName}'{firstName[firstName.length - 1] === 's' ? '' : 's'} Account Reports
      </h1>
      <Container>
        <Paper elevation={3}>
          <Box sx={{ width: '100%', padding: '16px' }}>
            <NavigationButtonsReports />
          </Box>
        </Paper>
      </Container>
    </>
  );
};
