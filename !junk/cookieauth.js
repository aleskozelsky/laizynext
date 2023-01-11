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


/**
 * 
 *  PURPOSE OF THIS FILE IS TO TEST IF AUTH WORKS WELL WITH THE MAIN WP INSTALL
 *  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX THIS WAS NOT USED AT THE END 
*  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX THIS WAS NOT USED AT THE END 
*  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX THIS WAS NOT USED AT THE END 
*  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX THIS WAS NOT USED AT THE END  
* 
 */

export default function cookieauth() {
  const checkVole = function (e){
    console.log('clicked on checkVole')

    fetch( {
      path: '/wp/v2/job_requests/',
      method: 'POST',
      headers: inputAtts.isUserLoggedIn ? false : { // if logged in, headers are done automatically, if not -> use guest acc headers
          'Authorization': 'Basic '+btoa('user not registered' + ':' + 'tdcD PsxG Erma fEpr D6ax y6zH'), 
          'Content-Type': 'application/json; charset=UTF-8; application/x-www-form-urlencoded',
      },    
      data: {
          "title" : 'SD V001: '+prompt, 
          "user_interface": inputAtts.taxUserInterfaceId,
          "powered_by" : poweredBy,
          "acf": { 
              "sd_group_v1":{
                  "prompt": prompt,
                  "num_outputs": numOutputs,
                  "width": imageW, 
                  "height": imageH, 
                  "num_inference_steps": numSteps,
                  "guidance_scale": guidanceScale,
                  "seed": seed ? seed : null,
              }
          }
      },
    } ).then( ( response ) => {
      console.log('checkVole: Success response:', response );
      // setErrMsg('')
      // setInfoMsg('Job Created. Job ID:'+response.id)
      // executeJob( response.id ) // NEXT STEP
    } ).catch( (response) => {
      console.log('checkVole: Error:',response)
      // setIsGenerating(false);
      // response.message ? setErrMsg('Job Creation Error: '+response.message) :   setErrMsg( JSON.stringify(response) );
      // response.data ? setInfoMsg( JSON.stringify(response.data.details) ) : setInfoMsg( JSON.stringify(response) ) ;
    } );   
  }
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <LaizyAppBar />
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <div>Ahoj is online: </div>
        <div onClick={checkVole}>checkvole</div>
      </Container>
      <LaizyFooter/>
    </React.Fragment>
  );
}
