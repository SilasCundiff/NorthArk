import { useAuthorizedContext } from '../context/AuthContext';
import { SettingsComp } from '../components/Settings/SettingsComp';
import { NotLoggedIn } from '../components/Global/NotLoggedIn';

const Settings = () => {
  const { user } = useAuthorizedContext();
  return <>{user ? <SettingsComp /> : <NotLoggedIn />}</>;
};

export default Settings;
