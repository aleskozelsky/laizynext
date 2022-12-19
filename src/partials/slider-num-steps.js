//import * as React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';

const marks = [
  {
    value: 50,
    label: '50 (default)',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function NumberOfSteps({numSteps, setNumSteps, isUserLoggedIn}) {
  return (
      <>
        <Stack spacing={2} direction="row"  >
          <StairsOutlinedIcon/>
          <Typography>
            Steps:
          </Typography> 
          <Typography>
             {numSteps}
          </Typography>    
          <HelpTwoToneIcon fontSize="small" />                           
        </Stack>
        <Slider
          aria-label="Custom marks"
          value={numSteps}
          onChange={ ( e ) => setNumSteps( e.target.value ) }
          min={1}
          max={ isUserLoggedIn ? 500 : 60 }//max={500}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          // color={ numSteps <= 50 ? "primary" : "warning" } // trying to be clever here
          marks={marks}
        />      
      </>

  );
}