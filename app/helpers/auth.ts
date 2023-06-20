import Cookies from "universal-cookie";

const storeLoginToken = async (token: string, days: number = 10) => {
    let res = await fetch('/api/login', {
         method : 'POST',
         headers : {
            'Content-Type' : 'application/json'
         },
         body : JSON.stringify({token})
    })
    // const cookies = new Cookies();
    // cookies.set('shopy_token', token, {
    //     path: '/',
    //     maxAge: (days * 24 * 3600) //24 * 3600 = one day
    //     // domain: '/' //for sub domains
    // })
}

const removeLoginToken = async () => {
    //در حالت غیر http only
    // let cookie = new Cookies();
    // cookie.remove('shopy_token');


    let res = await fetch('/api/logout', {
        method : 'POST',
        headers : {
           'Content-Type' : 'application/json'
        },
   })
}

export {storeLoginToken, removeLoginToken};