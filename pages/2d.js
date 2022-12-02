import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import Link from '../src/lib/Link'; // next.js link
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

/**
 * Partials
 */
import LaizyAppBar from '../src/LaizyAppBar';
import LaizyFooter from '../src/LaizyFooter';
import Generate2D from '../src/generate2d';

export default function page2D() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar />
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Link href="/" sx={{ textDecoration: "none"}}>
          <ArrowBackIosIcon/> Back
        </Link>
        <br/><br/>
        <Generate2D/>
      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}
