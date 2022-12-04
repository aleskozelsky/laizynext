import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

export default function Seed({seed, setSeed}) {
    return (
        <Stack spacing={2} direction="row" >
            <LocalFloristIcon/>

            <TextField
            id="seed"
            label="Seed (optional)"
            type="number"
            value={seed}
            onChange={ ( e ) => setSeed( e.target.value ) }
            // InputLabelProps={{
            //     shrink: true,
            // }}
            />
        </Stack>
    );
  }


