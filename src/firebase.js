var firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyCYxxc03AptZbfxMoUwtYxFK5muN6S3xLA",
    authDomain: "letschat-2659c.firebaseapp.com",
    projectId: "letschat-2659c",
    storageBucket: "letschat-2659c.appspot.com",
    messagingSenderId: "757844850455",
    appId: "1:757844850455:web:a312bbd0d8e1ef5650a952"
  };


const fb=firebase.default.initializeApp(firebaseConfig)

// const auth=firebase.default.auth()
 

//  export {auth,provider}