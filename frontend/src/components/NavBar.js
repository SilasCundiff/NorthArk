import React from "react";
import Box from '@mui/material/Box';

import { useAuthorizedContext } from "../context/AuthContext";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { ThemeToggler } from "./ThemeToggler";
import NortharkFullImg from '../assets/NorthArk_TypeLogo.png';
import { Container, Paper } from '@mui/material';


const NavBar = () => {
    const { user } = useAuthorizedContext();
   return (
    
<div>
           <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img alt='Northark Logo' className='tempNorthArkImg' src={NortharkFullImg} />
          <ThemeToggler />
        </Box>
        <Paper elevation={3}>
          <Box sx={{ width: "100%", height: 300, padding: "16px" }}>
            {/*basic logic for changing app based on authorization state (logged in or out)*/}
            {/*checks the value of auth (true or false) and renders either the login or logout button*/}
            {user ? <p>Logged In.</p> : <p>Logged Out.</p>}
            {/* in future this would return multiple components, or an entire page/pages, rather than just the different login/out buttons */}
            {user ? <LogoutButton /> : <LoginButton />}
          </Box>
        </Paper>
          </Container>
</div>
       )
   
 };
 export default NavBar;