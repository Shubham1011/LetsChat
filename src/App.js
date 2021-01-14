
import './App.css'
import ChatBox from './ChatBox'
import SideBar from './SideBar'
//import './firebase'
import Pusher from 'pusher-js'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Login from './Login';
import { positions, Provider, useAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
function App() {
const[messages,setMessages]=useState([]);
const [currRoom,setcurrRoom]=useState();
const [userName,setName]=useState('')
const [user,setUser]=useState(null)
const [disable,setDisable]=useState(true)

const changeRoom=(name)=>{


  setcurrRoom(name)
}


const userFectched=(userbase)=>{
  setUser(userbase)
  console.log('hello');
}

const options = {
  timeout: 10000,
  position: positions.TOP_CENTER,
  
};

useEffect(()=>{
if(user)
setName(user.displayName)

 // console.log(userName);

},[user])




  useEffect(()=>{
   // console.log('api called');
   console.log('api called');
    axios.get("http://localhost:8080/get").then(res=>{
        
        let m=[...messages,res.data]
        m.forEach((message)=>{
          if(message.name!=userName)
          message.received=true;
          else
          message.received=false;
         
         
      })

      setMessages(m)

    }).catch(e=>{
      console.log(e.message);
    })
  },[])
  
 


  useEffect(() => {
   console.log('subscriber created');
 var pusher = new Pusher('f9079a0d6790d52fcce8', {
  cluster: 'ap2'
});
    const channel = pusher.subscribe('chat');
    channel.bind('addMessage', function(data) {
     // alert(JSON.stringify(data));
    // alert.show('New Message from '+data.name)
      let m=[...messages,data]
      m.forEach((message)=>{
        if(message.name!=userName)
        message.received=true;
        else
        message.received=false;
       
       
    })
    setMessages(m)
    });

  //   messages.forEach((messs,index)=>{
        
  //     if(messs.name!=userName)
  //     messs.received=false;
  //     else
  //     messs.received=true;

  //     messages[index]=messs
  // })
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    // console.log('unsubscribed');
     //console.log('unsubscribed');
    }
    
 
    
  }, [messages])

//  console.log(messages);



  return (
    <div className="App">
       <Provider template={AlertTemplate} {...options}>
      {
        user ? (<div className="app_body">
         
        <SideBar photoURL={user.photoURL} currRoom={changeRoom}></SideBar>
            <ChatBox  room={currRoom} username={userName} messages={messages} disable={disable}  />
        </div>):(<div><Login userFectched={userFectched}></Login></div>)
      }
      </Provider>
    </div>
  );
}

export default App;
