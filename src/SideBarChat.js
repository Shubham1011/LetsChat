import { Avatar } from '@material-ui/core'
import React, { useEffect } from 'react'
import './chat.css'
function SidebarChat({room,currRoom}) {
 
    const createChat=()=>{
      const name=prompt("Please enter chat name")
      if(name){
          alert('done')
      }
    }
    
   
    
    return (
        <div className="whole" >
           <div className="chatbox"> <Avatar/><h2>{room.name}</h2>
          
           </div>
           <p>hello</p>
        </div>
    )
}



export default SidebarChat
