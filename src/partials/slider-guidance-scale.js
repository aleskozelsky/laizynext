import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ScaleIcon from '@mui/icons-material/Scale';




export default function SliderGuidanceScale({guidanceScale, setGuidanceScale}) {
    return (
        <>
            <Stack spacing={2} direction="row" >
                <ScaleIcon/>
                <Typography>
                    Guidance scale: 
                </Typography>
                <Typography>
                    {guidanceScale}
                </Typography>                                
            </Stack>
            <Slider
                step={0.1}
                min={1}
                max={20}
                value={guidanceScale}
                onChange={ ( e ) => setGuidanceScale( e.target.value ) }
                aria-label="Guidance scale"
                valueLabelDisplay="auto"
                marks={[{value: 7.5,label: '7.5 (default)'}]}
            />	  
        </>
  
    );
  }


