import React from "react";
import { Box } from '@mui/system';
import { useAuthorizedContext } from "../context/AuthContext";
import { ThemeToggler } from "./ThemeToggler";
import NortharkLogo from '../assets/NorthArk_ShapeLogo.png';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from 'react-router';

const NavBar = () => {
  const { user } = useAuthorizedContext();
  const navigate = useNavigate();
  return (  
    <div>
        <Box className='nav' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img alt='Northark Logo' className='northArkNavLogo' src={NortharkLogo} onClick={()=>{navigate('/')}} />
          <div className='d-flex flex-row'>
            {user ? <LogoutButton /> : <LoginButton />}
            <ThemeToggler />
          </div>
        </Box>
    </div>
  )
};
export default NavBar;