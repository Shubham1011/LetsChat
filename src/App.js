
import './App.css'
import ChatBox from './ChatBox'
import SideBar from './SideBar'
//import './firebase'
import Pusher from 'pusher-js'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Login from './Login';

function App() {
const[messages,setMessages]=useState([]);
const [currRoom,setcurrRoom]=useState();
const [userName,setName]=useState('')
const [user,setUser]=useState(null)
const [disable,setDisable]=useState(true)

const changeRoom=(name)=>{


  setcurrRoom(name)
}
useEffect(()=>{

  const username=prompt('Please enter userName')
  setName(username)
 // console.log(userName);

},[])

  useEffect(()=>{
   // console.log('api called');
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
  
  useEffect(()=>{

   
  
  },[messages])
  useEffect(() => {
 //   console.log('subscriber created');
    const pusher = new Pusher('3e888fccfeb395bd6cc6', {
      cluster: 'ap2'
    });
  
    const channel = pusher.subscribe('chat');
    channel.bind('addMessage', function(data) {
     // alert(JSON.stringify(data));
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
    //  console.log('unsubscribed');
    }
    
 
    
  }, [messages])

//  console.log(messages);

  return (
    <div className="App">
      
      {
        user ? (<div className="app_body">
          <h1>LetsChat</h1><h5>Thats all we do</h5>
        <SideBar currRoom={changeRoom}></SideBar>
            <ChatBox  room={currRoom} username={userName} messages={messages} disable={disable}  />
        </div>):(<div><Login></Login></div>)
      }
      
    </div>
  );
}

export default App;
