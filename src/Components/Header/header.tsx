import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
// import style from './header.module.scss';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            <Link to="/settings">Home</Link>
          </Typography>
          <Typography variant="h6" color="inherit" component="div">
            <Link to="/scheme">Scheme</Link>
          </Typography>
          <Typography variant="h6" color="inherit" component="div">
            <Link to="/settings">Settings</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
