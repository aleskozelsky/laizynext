import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

/**
 * MOJE
 */
import CanvasMask from './canvas-mask';

export default function InputImages({att1, att2}) {
    const isInputImage = true;

    return (
        <>
            <Button variant="outlined" startIcon={<PhotoCamera />}  aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                Upload
            </Button>     
            {
                isInputImage && 
                <div>
                    <img src ="https://www.muxu.cz/spree/products/2382/large/74332298_643180066212811_7308605964813336576_n.jpg?1634572103?w=248&fit=crop&auto=format"/>
                    <Button>Mask</Button>
                </div>
            }
                  
        </>

    );
}


 