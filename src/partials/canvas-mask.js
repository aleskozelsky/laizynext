import React, { useState, useEffect, useRef } from "react"; // tady tohle sem psal jaaaa a nevim jestli to je dobre 



/**
 * @see: https://www.youtube.com/watch?v=FLESHMJ-bI0
 */


export default function CanvasMask({att1, att2, src}) {

    const canvasARef = useRef(null)
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [thick, setThick] = useState(20)
    const [isDrawing, setIsDrawing] = useState(false)

    React.useEffect(()=>{ // Canvas A
        console.log('canvas a react use effect canvasARef:', canvasARef)
        // SAME AS BELOW REALLY 
        const canvas = canvasARef.current // HERE IS NOT SAME 
        canvas.width=att1*2 // 2 is for retina, fixed
        canvas.height=att2*2 // 2 is for retina, fixed
        canvas.style.width = `${att1}px`;
        canvas.style.height = `${att2}px`;

        const context = canvas.getContext("2d")

        // paint img - really this should be on another canvas (with same size, but different layer)
        const img = new Image;
        img.src = src;
        context.drawImage( img, 0,0 )

        // END 
    })


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
        context.linewidth = thick
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


    return (
        <>
            <div style={{border: "1px solid black", position:"relative"}}>
                <canvas 
                    style={{border:"1px solid red"}}
                    ref={canvasARef}
                />                
                <canvas 
                    style={{border:"1px solid green"}}
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                />

                    
            </div>
            <span>tohlexasdf</span>       
        </>
    )
}