import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
/**
 * Partials
 */
import LaizyAppBar from '../src/partials/LaizyAppBar';
import LaizyFooter from '../src/partials/LaizyFooter';
import Generate2D from '../src/generate2d';

export default function page2D() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar backbutton={true} />
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Generate2D/>
      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}
