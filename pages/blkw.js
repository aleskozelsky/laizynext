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

export async function getServerSideProps(){
  const result = await fetch(
    'https://laizy.ai/wp-json/wp/v2/posts'
  );
  const posts = await result.json();

  return { props: { posts } };
}

export default function Blkw({posts}) {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar />
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>

        <br/><br/>
        <h1>Blog/Learn/KnowledgeBase/Wiki</h1>
        <ul>
          {posts?.map(post => <li key={post.id} >
            <Link href={`/${post.slug}`}   >
              <a > {post?.title.rendered} </a>
            </Link>
          </li>)}
        </ul>

      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}
