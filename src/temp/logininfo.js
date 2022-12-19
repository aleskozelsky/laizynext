import * as React from 'react';
//import axios from 'axios';
/**
 * 
 * Just playing around trying to find out if logged in or not
 * 
 * 
 * 
 */
console.log('logininfo vole')
const getSomeResponse =  function (){
  console.log('clicked on getSomeResponse')
  
  fetch("http://laizy.ai/hauth", {
    method: 'GET',
    redirect: 'follow'
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  
   
}      

export default function LoginInfo() {

  return (
    <div onClick={getSomeResponse} > hauth
        
    </div>
  );
}


    // axios.get(
    //     'https://laizy.ai/wp-json/akapi/v1/isuserloggedin/',{
    //         headers: {
    //           'X-WP-NONCE': 'e5b5ebadb0'
    //         }})
    //     .then(response => {
    //         //this.customers = response.data;
    //         console.log('response.data',response.data)
    //     });
