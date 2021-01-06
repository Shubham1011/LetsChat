import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import SideBarChat from './SideBarChat'
import './sidebar.css'


function SideBar() {
    return (
        <div className="sidebar">
  
            <div className="sidebarhead">
             <Avatar></Avatar>
             <div className="sidebarrightheader">
                 <IconButton><DonutLarge></DonutLarge></IconButton>
                 
                <IconButton> <Chat></Chat></IconButton>
                <IconButton> <MoreVert></MoreVert></IconButton>
             </div>
             
            </div>
            <div className="sidebarsearch">
                <div className="searchContainer">
                <SearchOutlined></SearchOutlined>
                <input type="text" placeholder="Search Chat or start a new one"></input>
                </div>
              
            </div>
            <div className="sidebarchat">
              <SideBarChat addNewChat={true}/>
              <SideBarChat/>
              <SideBarChat/>
              <SideBarChat/>
              <SideBarChat/>

            </div>
        </div>
    )
}

export default SideBar
