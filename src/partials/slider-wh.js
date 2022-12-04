//import * as React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HeightIcon from '@mui/icons-material/Height';

const marks = [
    {
    value: 128,
    //label: '128px',
    },
    {
    value: 256,
    //label: '256px',
    },			
    {
    value: 512,
    label: '512px (default)',
    },
    {
    value: 768,
    label: '768px',
    },
    {
    value: 1024,
    //label: '1024px',
    },
];

function valuetext(value) {
    return `${value}px`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function SliderWH({imageWH, setImageWH, text}) {
  return (
      <>
        <Stack spacing={2} direction="row" >
          <HeightIcon sx={{transform: text == "Height" ?  "rotate(90deg)" : "rotate(0deg)"}}/> 
          <Typography>
             {text}: 
          </Typography>    
          <Typography>
            {imageWH}px
          </Typography>      
        </Stack>
        <Slider
          aria-label="Restricted values"
          value={imageWH}
          min={128}
          max={1024}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          marks={marks}
          onChange={ ( e ) => setImageWH( e.target.value ) }
        />
      </>
  );
}
