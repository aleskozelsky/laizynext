
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import RectangleTwoToneIcon from '@mui/icons-material/RectangleTwoTone'; // 1
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';  // 4
import GridOnTwoToneIcon from '@mui/icons-material/GridOnTwoTone'; // 9

// !!!!!!!!!!!!!!!!!!!!!!! THIS USES FORM CONTROL, BUT MAYBE IT SHOULD NOT 

export default function SelectNumOutputs({setNumOutputs, numOutputs}) {
    return (
        <>
            Number of Images
            <RadioGroup

                value={numOutputs}
                name="num-images"
                onChange={ ( e ) => setNumOutputs( e.target.value ) }
                row
            >
                <FormControlLabel value="1" control={<Radio icon={ <RectangleTwoToneIcon/> }    checkedIcon={ <RectangleTwoToneIcon color="primary"/> } />} label = "1" />
                <FormControlLabel value="4" control={<Radio icon={ <GridViewTwoToneIcon/> }     checkedIcon={ <GridViewTwoToneIcon color="primary"/> } />} label = "4" />
                {/*<FormControlLabel value="9" control={<Radio icon={ <GridOnTwoToneIcon/> }       checkedIcon={ <GridOnTwoToneIcon color="primary"/> } />}  label = "9" />*/}
            </RadioGroup>
        </>

    );
}