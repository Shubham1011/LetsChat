import { Avatar } from '@material-ui/core'
import React from 'react'
import './chat.css'
function SidebarChat({addNewChat}) {
 
    const createChat=()=>{
      const name=prompt("Please enter chat name")
      if(name){
          alert('done')
      }
    }
    
    
    return !addNewChat?(
        <div className="whole">
           <div className="chatbox"> <Avatar/><h2>Room Name</h2>
          
           </div>
           <p>hello</p>
        </div>
    ):(
        <div  onClick={createChat} className="whole" >
            <h2>Add new Chat</h2>
        </div>
    )
}



export default SidebarChat
