import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

export const NavigationButtons = () => {

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

            {window.location.pathname!=='/dashboard' &&
              <Link to='/dashboard'>
                <ListItemButton sx={{ pl: 4, padding: '2px 5px 2px 20px' }}>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
            }

            {window.location.pathname!=='/reports' &&
              <Link to='/reports'>
                <ListItemButton sx={{ pl: 4, padding: '2px 5px 2px 20px' }}>
                  <ListItemText primary="Reports" />
                </ListItemButton>
              </Link>
            }

            {window.location.pathname!=='/settings' &&
              <Link to='/settings'>
                <ListItemButton sx={{ pl: 4, padding: '2px 5px 2px 20px' }}>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </Link>
            }

            {/** change link to when we have the page for upgrading */}
            {/** check if the user is already upgraded and replace it with an advanced reports dropdown list */}
            {window.location.pathname!=='/upgrade' &&
              <Link to='/upgrade'>
                <ListItemButton sx={{ pl: 4, padding: '2px 5px 2px 20px' }}>
                  <ListItemText primary="Upgrade your Account" />
                </ListItemButton>
              </Link>
            }

          </List>
        </Collapse>

      </List>
  )
}