import { useAuthorizedContext } from '../context/AuthContext';
import { DashboardComp } from '../components/DashboardComp';
import { NotLoggedIn } from '../components/NotLoggedIn';


const Dashboard = () => {
  const { user } = useAuthorizedContext();
  return (
    <>
      { user ? <DashboardComp /> : <NotLoggedIn /> }
    </>
  )
};

export default Dashboard;
