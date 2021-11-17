import React from "react";
import { Box } from '@mui/system';
import { useAuthorizedContext } from "../context/AuthContext";
import { ThemeToggler } from "./ThemeToggler";
import NortharkFullImg from '../assets/NorthArk_TypeLogo.png';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const NavBar = () => {
  const { user } = useAuthorizedContext();
  return (  
    <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img alt='Northark Logo' className='tempNorthArkImg' src={NortharkFullImg} />
          {user ? <LogoutButton /> : <LoginButton />}
          <ThemeToggler />
        </Box>
    </div>
  )
};
export default NavBar;