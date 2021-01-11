import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'

import './login.css'
function Login() {
    var firebase = require('firebase');
    const signIn=()=>{
        
     //  const provider=firebase.default.auth.GoogleAuthProvider()
       const auth=firebase.default.auth()
       const provider=new firebase.default.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).then(res=>console.log(res)).catch(e=>alert(e.message))

         
    }

    return (
        <div className="login">
            
            <img src={'https://icon-library.com/images/chat-app-icon/chat-app-icon-0.jpg'}></img>
         <Button onClick={signIn}  >
         <img  src={'https://raw.githubusercontent.com/jmlopezdona/react-native-google-signin/HEAD/img/signin-button.png'}></img></Button> 
 
            
        </div>
    )
}

export default Login
