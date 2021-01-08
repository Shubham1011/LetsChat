import { Avatar, IconButton } from '@material-ui/core'
import { AttachFileOutlined, InsertEmoticon, Mic, MoreVert, Search, VoiceChat } from '@material-ui/icons'
import React from 'react'
import './chatbox.css'
function ChatBox({messages}) {

const sendMessage=()=>{
    alert('sent')
}



    return (
        <div class='wholechat'>
            <div className="chatHeader">
                <Avatar className="icon"></Avatar>
                <div><h1>Room Name</h1>
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
                messages.map(mess=>(
                  <div className={"all "+(mess.received?'receive':'none')}> <div className="chatname">{mess.name } </div> 
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
                <input type="text" placeholder="Type a message" ></input>
                <button  onClick={sendMessage}>Send </button>
                <IconButton> <Mic></Mic></IconButton>
            </div>
        </div>
    )
}

export default ChatBox
