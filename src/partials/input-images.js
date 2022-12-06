import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

/**
 * MOJE
 */
import CanvasMask from './canvas-mask';

export default function InputImages({att1, att2}) {
    //const isInputImage = true;

    // input file - START 
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    React.useEffect(() => { // create a preview as a side effect, whenever selected file is changed
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        console.log('sdsfsetting preview:', preview)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }   


    return (
        <>
            <Button variant="outlined" startIcon={<PhotoCamera />}  aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={onSelectFile} />
                Upload
            </Button>     
            {
                selectedFile  && 
                    <CanvasMask att1={720} att2={480} img={preview}/>
            }
                  
        </>

    );
}


 