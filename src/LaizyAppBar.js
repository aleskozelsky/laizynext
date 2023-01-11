import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Link from './lib/Link'; // next.js link
import TemporaryDrawer from './partials/temporary-drawer.js';

import Drawers from './drawers.js';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

/**
 * WP Auth
 */
import useSWR from 'swr'
const fetcher = (...args) => fetch(process.env.NEXT_PUBLIC_LAIZY_WP_HOST+"/hauth/", {credentials:"include"}).then((res) => res.json()  )
function useUser () {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_LAIZY_WP_HOST+"/hauth/", fetcher) // prvni argument je neco jako "id" podle kteryho se to cachuje? 
  console.log('useUser function- error:',error,'isLoading:', isLoading ,'data:',data )
  return {
    user: data,
    isLoading,
    isError: error
  }
}

export default function LaizyAppBar() {
  const { user, isLoading, isError } = useUser()

  //console.log('sdfsdfsd:',isError, isLoading, isLoggedIn, userEmail)

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
          
          {isError 
          ? <div>Auth Connection Error </div> 
          : (isLoading 
            ? 
                <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} disabled>
                  Loading... 
                </Button>      
            : (user.isLoggedIn 
                ? 
                  <>
                    <a href={process.env.NEXT_PUBLIC_LAIZY_WP_HOST+"/members/"+user.username} sx={{pr:1}} >
                      <Stack direction="row" spacing={2} alignItems="center">
                        {user.username}
                        <Avatar src={user.avatarUrl} alt={user.username}></Avatar>
                      </Stack>
                    </a >
                    
                  </>
                : 
                  <>
                    <Button href="https://laizy.ai/wp-login.php?ref=appbar-login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                      Login
                    </Button>      
      
                    <Button href="https://laizy.ai/register/?ref=appbar-register" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                      Sign Up
                    </Button>      
                  </>   
              )
          )}
         
          

          
          {/* <Drawers side="right"/>  */}
            
        </Toolbar>
      </AppBar>
  );
}
