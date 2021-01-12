import { Button } from '@material-ui/core'
import React from 'react'
import { useAlert } from 'react-alert'
import { auth, provider } from './firebase'

import './login.css'
function Login({userFectched}) {
    const userAlert=useAlert();
    
    var firebase = require('firebase');
    const signIn=()=>{
        
     //  const provider=firebase.default.auth.GoogleAuthProvider()
       const auth=firebase.default.auth()
       const provider=new firebase.default.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).then(res=>{

            userAlert.show('You got no agreements to make here !!')
            userFectched(res.user)
        }).catch(e=>alert(e.message))

         
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
