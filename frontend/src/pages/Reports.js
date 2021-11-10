import { useAuthorizedContext } from '../context/AuthContext';
import { ReportsComp } from '../components/ReportsComp';
import { NotLoggedIn } from '../components/NotLoggedIn';


const Reports = () => {
  const { user } = useAuthorizedContext();
  return (
    <>
        { user ? <ReportsComp /> : <NotLoggedIn /> }
    </>
  )
};

export default Reports;