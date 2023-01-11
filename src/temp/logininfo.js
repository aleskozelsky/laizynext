import * as React from 'react';




/**
 * 
 * Just playing around trying to find out if logged in or not
 * 
 * not really used, can be deleted i think.
 * 
 */
const getSomeResponse =  function (){
  console.log('clicked on getSomeResponse')
  console.log('process.env.NEXT_PUBLIC_LAIZY_WP_HOST: ', process.env.NEXT_PUBLIC_LAIZY_WP_HOST)
  //fetch("https://laizy.ai/wp-json/akapi/v1/isuserloggedin", {
  //fetch("https://laizy.ai/hauth", {
  fetch ( process.env.NEXT_PUBLIC_LAIZY_WP_HOST+"/hauth/",{
    method: 'GET',
    //mode: "no-cors",
    credentials: 'include', // include, *same-origin, omit
    //headers: {'X-WP-Nonce':'04ae3097ef'},
    redirect: 'follow'
  })
  .then((res) => res.json()) 
  .then(result => console.log('result',result))
  .catch(error => console.log('error', error));
  
   
}      

export default function LoginInfo() {
  // return (
  //   <div>nic</div>
  // )
  // ;
  return (
    <div onClick={getSomeResponse} > vole

    </div>
  );
}

