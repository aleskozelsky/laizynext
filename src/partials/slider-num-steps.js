//import * as React from 'react';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 50,
    label: '50',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function NumberOfSteps({numSteps, setNumSteps, isUserLoggedIn}) {
  return (
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
  );
}