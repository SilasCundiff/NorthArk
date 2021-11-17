import { useAuthorizedContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuthorizedContext();
  return (
    <>
          {/*basic logic for changing app based on authorization state (logged in or out)*/}
          {/*checks the value of auth (true or false) and renders either the login or logout button*/}
          {user ? <p>Logged In.</p> : <p>Logged Out.</p>}
          {/* in future this would return multiple components, or an entire page/pages, rather than just the different login/out buttons */}
    </>
  );
};

export default Home;
