import * as React from 'react';
import axios from 'axios';
/**
 * 
 * Just playing around trying to find out if logged in or not
 * 
 * 
 * 
 */
console.log('logininfo vole')
const getSomeResponse = function (){
    axios.get(
        'https://laizy.ai/wp-json/akapi/v1/isuserloggedin/',{
            headers: {
              'X-WP-NONCE': 'e5b5ebadb0'
            }})
        .then(response => {
            //this.customers = response.data;
            console.log('response.data',response.data)
        });
}      

export default function LoginInfo() {

  return (
    <div onClick={getSomeResponse} >XXXX
        
    </div>
  );
}
