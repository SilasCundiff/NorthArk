import { useColorModeContext } from '../context/ColorModeContext';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

export const ThemeToggler = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorModeContext();
  return (
    <IconButton sx={{ m: 'auto', mr: 1 }} onClick={toggleColorMode} color='inherit'>
      {theme.palette.mode === 'dark' ? <Brightness7Icon color='primary' /> : <Brightness4Icon color='primary' />}
    </IconButton>
  );
};
