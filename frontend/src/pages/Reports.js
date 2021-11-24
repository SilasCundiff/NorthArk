import { useAuthorizedContext } from '../context/AuthContext';
import { ReportsComp } from '../components/Reports/ReportsComp';
import { NotLoggedIn } from '../components/Global/NotLoggedIn';

const Reports = () => {
  const { user } = useAuthorizedContext();
  return <>{user ? <ReportsComp /> : <NotLoggedIn />}</>;
};

export default Reports;
