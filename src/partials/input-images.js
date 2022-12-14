import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


import CanvasMask from './canvas-mask';

export default function InputImages({att1, att2}) {
    
    const [selectedFile, setSelectedFile] = useState() // this is the file that gets selected

    const onSelectFile = e => {
        // 1/2 Deal with selectedFile 
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            console.log('onSelectFile - No file has been selected. e:',e)
            return
        }
        setSelectedFile( e.target.files[0]) // I've kept this example simple by using the first image instead of multiple
        console.log('onSelectFile e:',e,'selectedFile:',selectedFile)
    }   

    return (
        <>
            <Button variant="outlined" startIcon={<PhotoCamera />}  aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={onSelectFile} />
                Upload?
            </Button>     
            {
                selectedFile  && 
                    <CanvasMask att1={720} att2={480} file={selectedFile}/>
            }
                  
        </>

    );
}    