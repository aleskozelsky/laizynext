import useSWR from 'swr'
  /*
  // DATA STRUCTURE 
      // error
      return {
        isError : true, 
      }
      // initial value
      return  {
        isLoading : true,
      }
      // logged in user
      return {
        isLoading : false,
        isLoggedIn: true,  
        email: "my@email.com"
      }
      // logged out
      return {
        isLoading : false,
        isLoggedIn: false
      }  
  */

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function authData () {
  console.log('aaaa')
  const { data, error, isLoading } = useSWR(`http://localhost/laizy/hauth/`, fetcher)
  console.log('bbbb')
  return {
    isError:false,
    isLoading:false,
    isLoggedIn:true,
    email:'email vole'
  }
}

// export default function getAuthData() {
//   const { isLoading, isLoggedIn, email } = useSWR('http://localhost/laizy/hauth/', fetcher)
//   return {
//     isLoading : false,
//     isLoggedIn: true,  
//     email: "my@email.com"
//   }
// }
