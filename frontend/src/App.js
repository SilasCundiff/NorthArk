import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import React, {useState} from 'react';
import NortharkFullImg from './assets/NorthArk_TypeLogo.png';

function App() {

  {/*Auth State is set with the <LoginButton/> and <LogoutButton/> components*/}
  const [auth, setAuth] = useState(false);

  return (
    <div className="App">

      <img className='tempNorthArkImg' src={NortharkFullImg} />

      {/*basic logic for changing app based on authorization state (logged in or out)*/}
      {/*checks the value of auth (true or false) and renders either the login or logout button*/}
      {auth? <p>Logged In.</p> : <p>Logged Out.</p>}
      {/* in future this would return multiple components, or an entire page/pages, rather than just the different login/out buttons */}
      {auth? <LogoutButton setAuth={setAuth} /> : <LoginButton setAuth={setAuth} />}

    </div>
  );
}

export default App;
