
import './App.css'
import ChatBox from './ChatBox'
import SideBar from './SideBar'
import Pusher from 'pusher-js'
import React, { useState, useEffect } from "react";
import axios from 'axios';
function App() {
const[messages,setMessages]=useState([]);

  useEffect(()=>{
    console.log('api called');
    axios.get("http://localhost:8080/get").then(res=>{
        setMessages(res.data);
       
    }).catch(e=>{
      console.log(e.message);
    })
  },[])

  useEffect(() => {
    console.log('subscriber created');
    const pusher = new Pusher('3e888fccfeb395bd6cc6', {
      cluster: 'ap2'
    });
  
    const channel = pusher.subscribe('chat');
    channel.bind('addMessage', function(data) {
     // alert(JSON.stringify(data));
      setMessages([...messages,data])
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
      console.log('unsubscribed');
    }
    
    
  }, [messages])

  console.log(messages);

  return (
    <div className="App">
      <h1>LetsChat</h1><h5>Thats all we do</h5>
      <div className="app_body">
      <SideBar></SideBar>
          <ChatBox  messages={messages}/>
      </div>
    </div>
  );
}

export default App;
