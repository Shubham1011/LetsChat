import { Avatar, IconButton } from '@material-ui/core'
import { AttachFileOutlined, InsertEmoticon, Mic, MoreVert, Search, VoiceChat } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect , useState} from 'react'
import './chatbox.css'
function ChatBox({messages,room,username,disable}) {

    const [mess,setMess]=useState('');
    
const sendMessage=()=>{
   // alert('sent')
   //alert(room)
   if(room==undefined){
       alert('Please create a room on the left to start chatting OR select the new chat created')
   }
   else{
    axios.post('http://localhost:8080/add',{
  
        "message": mess,
        "name": username,
        "received": false,
        "room": room,
        "timeStamp": new Date().toLocaleTimeString()
      })
    }
}

const change=(e)=>{
setMess(e.target.value)
}





    return (
        <div class='wholechat'>
            {username}
            <div className="chatHeader">
                <Avatar className="icon"></Avatar>
                <div><h1>{room}</h1>
                <p>Last Seen today</p>
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
             
         
                  
                  
                   
                
           </div>
            <div className="typer">
                <IconButton><InsertEmoticon></InsertEmoticon></IconButton>
                <input type="text" placeholder="Type a message" onChange={change} ></input>
                <button  onClick={sendMessage}>Send </button>
                <IconButton> <Mic></Mic></IconButton>
            </div>
        </div>
    )
}

export default ChatBox
