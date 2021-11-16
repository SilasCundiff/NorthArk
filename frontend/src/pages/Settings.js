import { useAuthorizedContext } from '../context/AuthContext';
import { SettingsComp } from '../components/SettingsComp';
import { NotLoggedIn } from '../components/NotLoggedIn';


const Settings = () => {
  const { user } = useAuthorizedContext();
  return (
    <>
      { user ? <SettingsComp /> : <NotLoggedIn /> }
    </>
  )
};

export default Settings;