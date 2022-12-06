import React, { useState, useEffect, useRef } from "react"; // tady tohle sem psal jaaaa a nevim jestli to je dobre 

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


/**
 * @see: https://www.youtube.com/watch?v=FLESHMJ-bI0
 */

/**
 * TODO 
 *  -- DOES NOT WORK ON MOBILE (https://zipso.net/a-simple-touchscreen-sketchpad-using-javascript-and-html5/)
 * 
 */


export default function CanvasMask({att1, att2, img}) {

    const canvasARef = useRef(null)
    const canvasRef = useRef(null)
    const contextARef = useRef(null)
    const contextRef = useRef(null)
    const [thick, setThick] = useState(10)
    const [isDrawing, setIsDrawing] = useState(false)

    React.useEffect(()=>{ // Canvas A
        //console.log('canvas a react use effect canvasARef:', canvasARef)
        // SAME AS BELOW REALLY 
        const canvas = canvasARef.current // HERE IS NOT SAME 
        canvas.width=att1*2 // 2 is for retina, fixed
        canvas.height=att2*2 // 2 is for retina, fixed
        canvas.style.width = `${att1}px`;
        canvas.style.height = `${att2}px`;

        const context = canvas.getContext("2d")
        console.log('YYYYYYYYYYYYYYY img:', img)
        //context.drawImage( img, 0,0, att1*2, att2*2 )
        
        /*
        // THIS IS FOR SRC AND LOADING EXTERNAL STUFF 
        // paint img - really this should be on another canvas (with same size, but different layer)
        const img = new Image;
        img.src = src;
        img.onload = () => {
            context.drawImage( img, 0,0, att1*2, att2*2 )
        }
        */

        // END 
       // contextARef.current = context;
    },[])


    React.useEffect(() => {
        console.log('canvas react use effect (init) canvasRef:',canvasRef)
        const canvas = canvasRef.current
        canvas.width=att1*2 // 2 is for retina, fixed
        canvas.height=att2*2 // 2 is for retina, fixed
        canvas.style.width = `${att1}px`;
        canvas.style.height = `${att2}px`;

        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "black";
        context.lineWidth = thick
        contextRef.current = context;



    },[]); // what goes inside that empty array?  ????? (he was saying something like that here i control when  useEffect runs)

    const startDrawing = ({nativeEvent}) => {
        console.log('start drawing')
        const {offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)

    }

    const finishDrawing = () => {
        console.log('finish drawing')
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = ({nativeEvent}) => {
        if (!isDrawing){
            return // do nothing
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()

    }

    const saveCanvas = () => {

    }

    const resetCanvas = () => {
        
    }

    const undoCanvas = () => {

    }

    const redoCanvas = () => {

    }

    return (
        <> 
            <Stack direction="row" spacing={2}>
                <Button>Mask</Button>
                <Button>Mask Size</Button>

                <Button>Undo</Button>
                <Button>Redo</Button>
                <Button>Reset</Button>
            </Stack>

            <div style={{border: "1px solid black", position:"relative"}}>
                {/* BACKGROUND IMAGE */}        
                <canvas 
                    style={{border:"1px solid red",}}
                    ref={canvasARef}
                />        
                {/* WATERMARK */} 
                    {/* (this should really be on the outputs and not inputs) */}

                {/* MASK | NEGATIVE PROMPT */}               
                <canvas 
                    style={{border:"1px solid green", position:"absolute", top:"0", left:"0"}}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />
                   
            </div>
    
        </>
    )
}