import { Avatar } from '@material-ui/core'
import React from 'react'
import './chat.css'
function SidebarChat({room,currRoom}) {
 
    const createChat=()=>{
      const name=prompt("Please enter chat name")
      if(name){
          alert('done')
      }
    }
    
    const changeRoom=()=>{
        
    }
    
    return (
        <div className="whole" onClick={changeRoom}>
           <div className="chatbox"> <Avatar/><h2>{room.name}</h2>
          
           </div>
           <p>hello</p>
        </div>
    )
}



export default SidebarChat
