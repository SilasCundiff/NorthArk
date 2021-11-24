import { useAuthorizedContext } from '../context/AuthContext';
import { DashboardComp } from '../components/Dashboard/DashboardComp';
import { NotLoggedIn } from '../components/Global/NotLoggedIn';

const Dashboard = () => {
  const { user } = useAuthorizedContext();
  return <>{user ? <DashboardComp /> : <NotLoggedIn />}</>;
};

export default Dashboard;
