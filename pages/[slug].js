import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '../src/lib/Link'; // next.js link
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

// import Typography from '@mui/material/Typography';

// 

// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

/**
 * Partials
 */
import LaizyAppBar from '../src/LaizyAppBar';
import LaizyFooter from '../src/LaizyFooter';
//import Generate2D from '../src/generate2d';

export async function getServerSideProps({ params }){
  const result = await fetch(
    `https://laizy.ai/wp-json/wp/v2/posts?slug=${params.slug}}`
  );
  const post = await result.json();

  const infosmazto = { nevim: "vole asi to fakt nevim?", cotoje: params, tohlejepost: post }

  return { props: { post, infosmazto } };
}

export default function Post({post, infosmazto}) {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar />
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <article>
            {console.log('post:',post)}
            <br/><br/>
                {console.log('infosmazto:',infosmazto)}
            <h1>Title: {post[0].title.rendered}</h1>
            <div dangerouslySetInnerHTML={ {__html: post[0].content.rendered } } ></div>            
        </article>
      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}
