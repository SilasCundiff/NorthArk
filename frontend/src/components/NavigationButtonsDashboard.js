import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

export const NavigationButtonsDashboard = () => {

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return(
      <List
      sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper', margin: 'auto', padding: '0', marginBottom: '10px'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      >
        <ListItemButton sx={{padding: '0 10px'}} onClick={handleClick}>
          <ListItemText primary="Navigation" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> 

        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <Link to='/Reports'>
            <ListItemButton sx={{ pl: 4, padding: '2px 5px 2px 20px' }}>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </Link>

          {/** change link to when we have the page for upgrading */}
          <Link to='/'>
            <ListItemButton sx={{ pl: 4, padding: '2px 5px 0 20px' }}>
              <ListItemText primary="Upgrade your Account" />
            </ListItemButton>
          </Link>

          </List>
        </Collapse>

      </List>
  )
}