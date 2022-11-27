import React, { useState } from "react";

/**
 * MUI
 */
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl'; // import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';


// Accordion (Customization 1/2)
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * WORDPRESS
 */
//import apiFetch from '@wordpress/api-fetch';
/**
 * INTERNAL 
 */
import SelectNumOutputs from './partials/select-num-outputs' 
//import FormSubmitImage from './ajax/form-submit-image' 

import SliderWH from './partials/slider-wh'
import SliderNumSteps from './partials/slider-num-steps'

import ButtonGroupGenerate from './partials/button-group-generate'

import OutputImages from './partials/output-images'

const inputAtts = 
{
    isUserLoggedIn: true,
    userId: 1,
    guestId: 4,
    taxPoweredByObj: [
        {
            value: 42,
            option: "Generate with Laizy API"
        },
        {
            value: 43,
            option: "Generate with Replicate API (third party)"
        }
    ],
    taxUserInterfaceId: 38,
    isLoggedInUserReplicateTokenAvail: "",
    manageApiTokensUrl: "http://localhost/laizy/members/Alki/profile/edit/group/2/",
    pluginVersion: "2022.11.23"
}

// Accordion (Customization 2/2 ) - Tohle tady nechci, tohle chci nekde jinde ale nevim jak to udelat :-)  !!! aktodo 
        const Accordion = styled((props) => (
            <MuiAccordion disableGutters elevation={0} square {...props} />
        ))(({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            '&:not(:last-child)': {
            borderBottom: 0,
            },
            '&:before': {
            display: 'none',
            },
        }));
        
        const AccordionSummary = styled((props) => (
            <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
            />
        ))(({ theme }) => ({
            backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
            },
            '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
            },
        }));
        
        const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
            padding: theme.spacing(2),
            borderTop: '1px solid rgba(0, 0, 0, .125)',
        }));


export default function ImageGenerator(inputAtts) {
    //console.log('inputAtts inside ImageGenerator', inputAtts)
    // Constants
	const [isGenerating, setIsGenerating] = useState(false);
	const [outputs, setOutputs] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [infoMsg, setInfoMsg] = useState(false);
    
	// form constants
    const [prompt, setPrompt] = useState(''); // 
    const [numOutputs, setNumOutputs] = useState(1); // Not really ready, skipping to imagewh
    const [imageW, setImageW] = useState(768);
    const [imageH, setImageH] = useState(768);
    const [numSteps, setNumSteps] = useState(50);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [seed, setSeed] = useState('');
    const [poweredBy, setPoweredBy] = useState(43); // does not work perfectly, only for the first option. !!! AKTODO

    
    const submitForm = function(e) {
        console.log('Step1: submitForm: (clicked on generate)  poweredBy:',poweredBy,' ')
        e.preventDefault();
        // Clear Err and Info MSG
        setErrMsg('');
        setInfoMsg('');        
        // initial checks
        if (!inputAtts.isLoggedInUserReplicateTokenAvail && poweredBy == 43 ){
            setErrMsg('You do not have a Replicate.com API key. ');
            setInfoMsg('Please click on "Manage External API Tokens" and follow instructions to attach a Replicate API token. ');
            return;
        }
        // checks are passed, lets start to generate 
        setIsGenerating(true);
        fetch( {
            path: '/wp/v2/job_requests/',
            method: 'POST',
            headers: inputAtts.isUserLoggedIn ? false : { // if logged in, headers are done automatically, if not -> use guest acc headers
                'Authorization': 'Basic '+btoa('user not registered' + ':' + 'tdcD PsxG Erma fEpr D6ax y6zH'), 
                'Content-Type': 'application/json; charset=UTF-8; application/x-www-form-urlencoded',
            },    
            data: {
                "title" : 'SD V001: '+prompt, 
                "user_interface": inputAtts.taxUserInterfaceId,
                "powered_by" : poweredBy,
                "acf": { 
                    "sd_group_v1":{
                        "prompt": prompt,
                        "num_outputs": numOutputs,
                        "width": imageW, 
                        "height": imageH, 
                        "num_inference_steps": numSteps,
                        "guidance_scale": guidanceScale,
                        "seed": seed ? seed : null,
                    }
                }
            },
            } ).then( ( response ) => {
            console.log('Step1: Success - Job Request created and converted to Job. response:', response );
            setErrMsg('')
            setInfoMsg('Job Created. Job ID:'+response.id)
            executeJob( response.id ) // NEXT STEP
        } ).catch( (response) => {
            console.log('Step1: Error Job Creation Error:',response)
            setIsGenerating(false);
            response.message ? setErrMsg('Job Creation Error: '+response.message) :   setErrMsg( JSON.stringify(response) );
            response.data ? setInfoMsg( JSON.stringify(response.data.details) ) : setInfoMsg( JSON.stringify(response) ) ;
        } );       

        const executeJob = function ( jobId ) {
            console.log('executeJob: initialized', jobId);
            // POST
            fetch( { path: '/akapi/v1/executejob/'+jobId, method: 'POST', } ).then( ( response ) => {
                console.log('Step2: Success executeJob response: ', response );
                //setIsGenerating(false);
                setInfoMsg(response.message)
                checkJobStatus( response.id ); // NEXT STEP
            } ).catch( (response) => { // Same as above
                console.log('Step2: Error executeJob response:',response)
                setIsGenerating(false);
                response.message ? setErrMsg('Create Job Error: '+response.message) :   setErrMsg( JSON.stringify(response) );
                response.data ? setInfoMsg( JSON.stringify(response.data.details) ) : setInfoMsg( JSON.stringify(response) ) ;
            } );         
            return 
        }

        const checkJobStatus = function (jobId){
            console.log('checkJobStatus: initialized');
            // GET
            fetch( { path: '/akapi/v1/checkjob/'+jobId,  } ).then( ( response ) => {
                console.log('Step3: Success checkJobStatus response: ', response );
                //setIsGenerating(false);
                if ( response.status == "r_starting" || response.status ==  "r_processing" ) {
                    setTimeout(() => {
                        console.log("Delayed for 1 second.");
                        checkJobStatus( response.id ); // REPEAT THIS STEP WITH SMALL DELAY
                      }, "1000")                    
                } else if (response.status == "r_succeeded") {
                    setIsGenerating(false);
                    console.log('Job ID:',response.id,' completed Successfully. Credit cost:',response.credit_cost )
                    setErrMsg('');
                    setInfoMsg( 'Job ID:'+response.id+' completed Successfully. Credit cost:'+response.credit_cost );
                    setOutputs(response.output)

                } else {
                    setErrMsg('Check Job - Status Error:',response.message );
                    setInfoMsg(response.error)
                    setIsGenerating(false);
                }
            } ).catch( (response) => { // Same as above
                console.log('Step3: Error checkJobStatus response:',response)
                setIsGenerating(false);
                response.message ? setErrMsg('Check Job Error: '+response.message) :   setErrMsg( JSON.stringify(response) );
                response.data ? setInfoMsg( JSON.stringify(response.data.details) ) : setInfoMsg( JSON.stringify(response) ) ;
            } );         
            return 
            
        }
    } // end of submitForm 

    return (
        <Box >
            <form onSubmit={submitForm} >
                <FormControl >
                    <div>
                        <TextField sx={{ width: "100%" }}
                            id="prompt" 
                            label="Prompt"
                            multiline
                            maxRows={8}
                            value={prompt}
                            onChange={ ( e ) => setPrompt( e.target.value ) }
                        />	                        
                    </div>   

                    <SelectNumOutputs setNumOutputs={setNumOutputs} numOutputs={numOutputs} />

                    <Accordion>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Options</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item >
                                    Width
                                    <Box sx={{ width: 300, marginLeft: "1rem", marginRight: "1rem" }} >
                                        <SliderWH imageWH={imageW} setImageWH={setImageW} />
                                    </Box>
                                </Grid>
                                <Grid item >
                                    Height
                                    <Box sx={{ width: 300, marginLeft: "1rem", marginRight: "1rem" }} >
                                        <SliderWH imageWH={imageH} setImageWH={setImageH}/>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{ width: 300 }}>
                                Number of Steps
                                <SliderNumSteps isUserLoggedIn={inputAtts.isUserLoggedIn} numSteps={numSteps} setNumSteps={setNumSteps}/>
                            </Box>
                            
                            <Box sx={{ width: 300 }}>
                                Guidance scale
                                <Slider
                                    step={0.1}
                                    min={1}
                                    max={20}
                                    value={guidanceScale}
                                    onChange={ ( e ) => setGuidanceScale( e.target.value ) }
                                    aria-label="Guidance scale"
                                    valueLabelDisplay="auto"
                                    marks={[{value: 7.5,label: '7.5'}]}
                                />					
                            </Box>

                            <Box sx={{ width: 300 }}>
                                <TextField
                                id="outlined-number"
                                label="Seed (optional)"
                                type="number"
                                value={seed}
                                onChange={ ( e ) => setSeed( e.target.value ) }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            </Box>                            
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>Styles (n/a)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

					{   outputs && 
                        <OutputImages outputs={outputs} inputAtts={inputAtts}/>
					}   

					<div style={{textAlign:"center", marginTop:"2rem"}}>

						{!isGenerating && inputAtts.isUserLoggedIn &&
                            <ButtonGroupGenerate 
                                poweredBy={poweredBy} 
                                setPoweredBy={setPoweredBy} 
                                dropDownOptions={ inputAtts.taxPoweredByObj }  
                                isLoggedInUserReplicateTokenAvail={inputAtts.isLoggedInUserReplicateTokenAvail}
                            />
                        }
                        {!isGenerating && !inputAtts.isUserLoggedIn && <Button variant="contained"  type="submit" >Generate</Button> }

						{isGenerating &&<Button disabled> <CircularProgress sx={{ mr: 1 }}  /> Generating</Button>}
					</div>
					<div style={{textAlign:"right", marginTop:"1.5rem"}}>
                        {inputAtts.isUserLoggedIn && <a href={inputAtts.manageApiTokensUrl}><i className="bb-icon-browser-terminal bb-icon-l"></i> Manage API Tokens</a> }
					</div>	
                    {
                        errMsg && 
                            <Alert severity="error" sx={{marginTop:"1rem"}}> {errMsg} </Alert>
                    }        
                    {
                        infoMsg && 
                            <Alert severity="info" sx={{marginTop:"1rem"}}> {infoMsg} </Alert>
                    }    
                </FormControl>
            </form>
        </Box>
    );
  }