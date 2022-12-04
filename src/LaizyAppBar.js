import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Link from './lib/Link'; // next.js link
import TemporaryDrawer from './partials/temporary-drawer.js';

import Drawers from './drawers.js';

export default function LaizyNav() {
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
              Laizy.ai 
            </Link>
          </Typography>
          <nav>
            
            
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
          <Button href="https://laizy.ai/wp-login.php?ref=appbar-login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>      

          <Button href="https://laizy.ai/register/?ref=appbar-register" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Sign Up
          </Button>
          
          {/* <Drawers side="right"/>  */}
            
        </Toolbar>
      </AppBar>
  );
}
