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

export default function Generate2d() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar backbutton={true} />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          2D
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          2D vole
        </Typography>
      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}
