import React, { useState } from "react";

/**
 * MUI
 */
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl'; // import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


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
 * MUI ICONS
 */
 import HeightIcon from '@mui/icons-material/Height';
 import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
 import ScaleIcon from '@mui/icons-material/Scale';
 import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';


/**
 * WORDPRESS
 */
//import apiFetch from '@wordpress/api-fetch';
/**
 * INTERNAL 
 */
import SelectNumOutputs from './partials/select-num-outputs' 
//import FormSubmitImage from './ajax/form-submit-image' 

//import Width from '.partials/width'; // new

import SliderWH from './partials/slider-wh'
import SliderNumSteps from './partials/slider-num-steps'
import SliderGuidanceScale from './partials/slider-guidance-scale'
import Seed from './partials/seed'
import ButtonGroupGenerate from './partials/button-group-generate'

import InputImages from './partials/input-images'
import OutputImages from './partials/output-images'

const inputAtts =  // LOGGED OFF 
{
    isUserLoggedIn:false,
    userId:0,
    guestId:4,
    taxPoweredByObj:[{value:41,option:"Generate"}],
    taxUserInterfaceId:38,
    isLoggedInUserReplicateTokenAvail:false,
    manageApiTokensUrl:false,
    pluginVersion:"1.1.6",
    aaaaa:"tohle_je_fake_data"
}

const inputAtts_LOGGEDIN = // LOGGED IN 
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
            borderBottom: `1px solid ${theme.palette.divider}`, // AK TOHLE SEM ZMENIL
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


export default function ImageGenerator(authData) { // tady bylo ImageGenerator(inputAtts)
    //console.log('inputAtts inside ImageGenerator', inputAtts)
    // Constants
	const [isGenerating, setIsGenerating] = useState(false);
	const [outputs, setOutputs] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [infoMsg, setInfoMsg] = useState(false);
    
	// form constants
    const [prompt, setPrompt] = useState(''); // 
    const [numOutputs, setNumOutputs] = useState(4); 
    const [imageW, setImageW] = useState(512);
    const [imageH, setImageH] = useState(512);
    const [numSteps, setNumSteps] = useState(50);
    const [guidanceScale, setGuidanceScale] = useState(7.5);
    const [seed, setSeed] = useState('');
    const [poweredBy, setPoweredBy] = useState(inputAtts.taxPoweredByObj[0].value); // does not work perfectly, only for the first option. !!! AKTODO

    
    const submitForm = function(e) {
        console.log('Step1: submitForm: (clicked on generate)  poweredBy:',poweredBy,' ', inputAtts)
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
        fetch( process.env.NEXT_PUBLIC_LAIZY_WP_HOST+'/wp-json/wp/v2/job_requests/', {
            //path: '/wp/v2/job_requests/',
            method: 'POST',
            credentials: 'include',
            headers: {'X-WP-Nonce':'31726ab1d5'},
            // headers: inputAtts.isUserLoggedIn ? false : { // if logged in, headers are done automatically, if not -> use guest acc headers
            //     'Authorization': 'Basic '+btoa('user not registered' + ':' + 'tdcD PsxG Erma fEpr D6ax y6zH'), 
            //     'Content-Type': 'application/json; charset=UTF-8; application/x-www-form-urlencoded',
            // },    
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
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left"
                        color="text.primary"
                        gutterBottom
                    >
                        Input
                    </Typography>                    
                    <Stack spacing={2} >
                        <TextField sx={{ width: "100%" }}
                            id="prompt" 
                            label="Prompt"
                            multiline
                            maxRows={8}
                            value={prompt}
                            onChange={ ( e ) => setPrompt( e.target.value ) }
                        />	  
                        <InputImages/>
                    </Stack >   
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left"
                        color="text.primary"
                        gutterBottom
                    >
                        Optional
                    </Typography>   
                    <SelectNumOutputs setNumOutputs={setNumOutputs} numOutputs={numOutputs} />

                    <Accordion>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>
                                Options
                            </Typography>
                            <Typography sx={{color:"lightgray"}}>
                                <HeightIcon sx={{ml:2}} /> {imageW}px 
                                <HeightIcon sx={{ml:2}}/> {imageH}px 
                                <StairsOutlinedIcon  sx={{ml:2}}/> {numSteps}  
                                <ScaleIcon  sx={{ml:2}}/> {guidanceScale} 
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SliderWH imageWH={imageW} setImageWH={setImageW} text={"Width"} />
                            <SliderWH imageWH={imageH} setImageWH={setImageH} text={"Height"} />
                            <SliderNumSteps isUserLoggedIn={inputAtts.isUserLoggedIn} numSteps={numSteps} setNumSteps={setNumSteps}/>
                            <SliderGuidanceScale guidanceScale={guidanceScale} setGuidanceScale={setGuidanceScale} />
                            <Seed/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Styles & Artists</Typography>
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
                        <div>
                            <br/><br/>
                            <OutputImages outputs={outputs} inputAtts={inputAtts} />
                        </div>

					}   

					<div style={{textAlign:"center", marginTop:"2rem"}}>

                        <span 
                        style={{marginRight:"2rem", color:"rgb(247 247 247)"}}
                        onClick={ () => setOutputs( 
                            [
                                "https://www.muxu.cz/spree/products/2382/large/74332298_643180066212811_7308605964813336576_n.jpg?1634572103",
                                "https://www.muxu.cz/spree/products/2382/large/74332298_643180066212811_7308605964813336576_n.jpg?1634572103",
                                "https://www.muxu.cz/spree/products/2382/large/74332298_643180066212811_7308605964813336576_n.jpg?1634572103",
                                "https://www.muxu.cz/spree/products/2382/large/74332298_643180066212811_7308605964813336576_n.jpg?1634572103",
                            ]
                            ) }>
                            &
                        </span>
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
/*

const newIdea__InputAtts = 
{
    isUserLoggedIn: true,
    userId: 4,
    taxPoweredByObj: [ // "powered by taxonomy - options"
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
    isLoggedInUserReplicateTokenAvail: "", // nevim? 
    manageApiTokensUrl: "http://localhost/laizy/members/Alki/profile/edit/group/2/",
    pluginVersion: "2022.11.23"    
}


*/