//import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

/**
 * WORDPRESS
 */
//import apiFetch from '@wordpress/api-fetch';


export default function OutputImages({outputs, inputAtts}) {
  const saveOutputImage = function (index){
      console.log('saveOutputImmage Initialized')

      const img = document.getElementById('abcdef-'+index);

      fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
          const file = new File([blob], 'dot.png', blob)
          console.log('mam file' ,file)
          fetch( {
              path: '/buddyboss/v1/media/upload',
              method: 'POST',
              headers: inputAtts.isUserLoggedIn ? false : { // if logged in, headers are done automatically, if not -> use guest acc headers
                  'Authorization': 'Basic '+btoa('user not registered' + ':' + 'tdcD PsxG Erma fEpr D6ax y6zH'), 
                  'Content-Type': 'application/json; charset=UTF-8; multipart/form-data',
              },   
               
              file : file,
              data: {
                  "file" : file,
              },
              parameters: {
                "file" : file,
              }
              }  ).then( ( response ) => {
              console.log('saveOutputImmage response: ', response );
              //setIsGenerating(false);
              // if ( response.status == "r_starting" || response.status ==  "r_processing" ) {
              //     setTimeout(() => {
              //         console.log("Delayed for 1 second.");
              //         checkJobStatus( response.id ); // REPEAT THIS STEP WITH SMALL DELAY
              //       }, "1000")                    
              // } else if (response.status == "r_succeeded") {
              //     setIsGenerating(false);
              //     console.log('Job ID:',response.id,' completed Successfully. Credit cost:',response.credit_cost )
              //     setErrMsg('');
              //     setInfoMsg( 'Job ID:'+response.id+' completed Successfully. Credit cost:'+response.credit_cost );
              //     setOutputs(response.output)

              // } else {
              //     setErrMsg('Check Job - Status Error:',response.message );
              //     setInfoMsg(response.error)
              //     setIsGenerating(false);
              // }
          } ).catch( (response) => { // Same as above
              console.log('saveOutputImage Error response:',response)
              // setIsGenerating(false);
              // response.message ? setErrMsg('Check Job Error: '+response.message) :   setErrMsg( JSON.stringify(response) );
              // response.data ? setInfoMsg( JSON.stringify(response.data.details) ) : setInfoMsg( JSON.stringify(response) ) ;
          } );    
      })        
  }  
  return (
    <ImageList>
      {outputs.map((output, index) => (
        <ImageListItem key={index}>
          <img
            id={'abcdef-'+index}
            src={`${output}?w=248&fit=crop&auto=format`}
            srcSet={`${output}?w=248&fit=crop&auto=format&dpr=2 2x`}
            //alt={output}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{textAlign:"center"}}
            title={
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              
              <a href="/register/"><Button startIcon={<EditIcon/>} > Edit</Button></a>
              <a href="/register/"><Button startIcon={<SaveAltIcon/>} onClick={ () => { saveOutputImage( index  ) }  }> Save</Button></a>
              <a href="/register/"><Button startIcon={<ShareIcon/>} > Share</Button></a>
            </ButtonGroup>
            }
            //subtitle={}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

/*
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
*/







/*


export default function SliderWH({outputs}) {

    return (
    <div style={{textAlign:"center", margin:"1rem"}}>

      {outputs.map((output, index) => {
        return (
          <div>
            <p>Index: {index }</p>
            <img src={output}></img>
          </div>
        );
      })}

    </div>
    );
  }
  

*/