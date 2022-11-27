import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Link from '../../src/Link'; // next.js link
import TemporaryDrawer from './temporary-drawer.js'

export default function LaizyNav({backbutton}) {
  return (
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link href="/" sx={{textDecoration:"none"}}>
              <ArrowBackIosIcon sx={backbutton ? {opacity: 1} : {opacity:0}}/> Laizy.ai 
            </Link>
          </Typography>
          <nav>
            
            <TemporaryDrawer lrtb="l" />
            {/*

            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>            
            */}

          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>          
          <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Sign Up
            {/* IDEALNE CHCI, ABY CELA REGISTRACE PROBEHLA V RIGHT DRAWERU, bez nutnosti opustit stranku */}
          </Button>
        </Toolbar>
      </AppBar>
  );
}
