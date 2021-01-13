import { Avatar, Button, IconButton } from '@material-ui/core'
import { AttachFileOutlined, InsertEmoticon, Mic, MoreVert, Search, VoiceChat } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { useAlert } from 'react-alert'
import './chatbox.css'
import {Bounce, Digital, Dots, Levels, Sentry, Spinner, Squares,Windmill} from 'react-activity';
import { render } from 'react-dom';
import 'react-activity/dist/react-activity.css';
function ChatBox({messages,room,username,disable}) {

    const [mess,setMess]=useState('');
    const[sending,setSending]=useState(false)
    useEffect(()=>{

        messages.forEach((message)=>{

            if(message.name!=username)
            message.received=true;
            else
            message.received=false;
                })
        
    },[messages])

    const hola=(e)=>{
        
      
      
      if(e.code=='Enter'){
        document.getElementById('te').value=''
        sendMessage()
      }


    }
   
const sendMessage=()=>{
    setSending(true)
   // alert('sent')
   //alert(room)
   if(room==undefined){
       alert('Please create a room on the left to start chatting OR select the new chat created')
   }
   else{
    axios.post('https://letschatbackend.herokuapp.com/add',{
  
        "message": mess,
        "name": username,
        "received": false,
        "room": room,
        "timeStamp": new Date().toLocaleTimeString()
      }).then(res=>{
          setMess('')
          document.getElementById('te').value=''
          setSending(false)
      })
    }

 
}

const change=(e)=>{
setMess(e.target.value)
}






    return (
        <div class='wholechat'>
        
            <div className="chatHeader">
                <Avatar className="icon"></Avatar>
                <div><h1>{room}</h1>
                <p>online</p>
                </div>
                <div className="chatheaderright">
                   
                   <IconButton>
                       <Search></Search>
                   </IconButton>
                   <IconButton><AttachFileOutlined/></IconButton> 
                   <IconButton><MoreVert></MoreVert></IconButton>

                </div>
            </div>
            <div class="chatWindow">
              {
                messages.filter(m=>m.room==room).map(mess=>(
                  <div className={"all "+(mess.received?'none':'receive')}> <div className="chatname">{mess.name } </div> 
                  <div className="message">  
                   {mess.message}
                    <div className="timestamp"> {mess.timeStamp}</div>
                    </div>
                    </div> 
                ))
              }
            {
            
            sending ? (<div><Digital size={35} color={'blue'}/></div>):(<div></div>)

            }
             
         
                  
                  
                   
                
           </div>
            <div className="typer">
                <IconButton><InsertEmoticon></InsertEmoticon></IconButton>
                
                <input  autoComplete="off" onKeyPress={hola} id="te" type="text" placeholder="Type a message" onChange={change} ></input>
                <Button id="btn" type="submit" onClick={sendMessage}>Send </Button>
               
                <IconButton> <Mic></Mic></IconButton>
            </div>
        </div>
    )
}

export default ChatBox
