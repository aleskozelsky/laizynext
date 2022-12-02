import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '../src/lib/Link'; // next.js link
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
/**
 * Partials
 */
import LaizyAppBar from '../src/LaizyAppBar';
import LaizyFooter from '../src/LaizyFooter';
import LoginInfo from '../src/temp/logininfo';

/**
 * Inspired by: https://github.com/mui/material-ui/blob/v5.10.14/docs/data/material/getting-started/templates/pricing/Pricing.js
 */



const tiers = [
  {
    title: '2D',
    //subheader: '',
    price: 'Image',
    description: [
      'Photography',
      'Computer Graphics',
      'Art',
      'Image to Image',
    ],
    buttonText: 'Start',
    buttonVariant: 'contained',
    href:"/2d"
  },
  {
    title: '3D',
    //subheader: '',
    price: 'Model',
    description: [
      'People and Characters',
      'Landscape',
      'Image to 3D',
      'Text to 3D',
    ],
    buttonText: 'Add Image',
    buttonVariant: 'outlined',
    href:"/3d"
  },
  {
    title: '4D',
    //subheader: '',
    price: 'Animation',
    description: [
      'Dynamic Environment',
      'Motion',
      '...',
      '....',
    ],
    buttonText: '(Coming soon)',
    buttonVariant: 'outlined',
    href: false,
    disabled : true,
  },
];


export default function Index() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar backbutton={false} />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          What media do you want AI to generate?
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Laizy.ai will generate any image or 3D model you can imagine. Animations coming soon.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end" >
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === '2D' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price}
                    </Typography>
                    {/* 
                    <Typography variant="h6" color="text.secondary">
                    </Typography>                    
                    */}
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  {
                  tier.href 
                  ? 
                    <Link href={tier.href} sx={{width:"100%"}} >
                      <Button fullWidth variant={tier.buttonVariant} disabled={tier.disabled}>
                        {tier.buttonText}
                      </Button>
                    </Link> 
                  :
                    <Button fullWidth variant={tier.buttonVariant} disabled={tier.disabled}>
                      {tier.buttonText}
                    </Button>                                    
                   }

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" align="center" color="text.primary" gutterBottom sx={{marginTop:"2rem"}}>
          Brought to you by
        </Typography>    
        <Stack direction="row" spacing={4} justifyContent="center">
          <img src="./ext/stability.webp" width="100" style={{filter: "grayscale(100%)", opacity: "0.8"}} />
          <img src="./ext/nvidia.svg" width="100" style={{filter: "grayscale(100%)", opacity: "0.8"}} />
          <img src="./ext/react.svg" width="100" style={{filter: "grayscale(100%)", opacity: "0.8"}} />
          <img src="./ext/nextjs.svg" width="100" style={{filter: "invert(100%)", opacity: "0.8", }} />
        </Stack>         
        <div>Je login</div>
        <div><LoginInfo></LoginInfo></div>

      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}



// BELOW IS THE DEFAULT FROM THE TEMPLATE 
/*
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
*/

/*
export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example 2
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
*/