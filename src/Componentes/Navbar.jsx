import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Link } from 'react-router-dom'
import "./TodoApp.css"
// import { Checkbox } from '@mui/material';

export default function Navbar() {

    return ( <Box>
        <AppBar position="static">
          <Toolbar className='toolbar'>
            <Link className='navButtons' to="/">
            <PlaylistAddCheckIcon />
            <Typography component="div" >
              Todo App
            </Typography>
            </Link>
            <div>
            {/* <Checkbox color="inherit"><Link className='navButtons' id='bdark' to="/">dark mode</Link></Checkbox> */}
            </div>
          </Toolbar>
        </AppBar>
      </Box>)
}