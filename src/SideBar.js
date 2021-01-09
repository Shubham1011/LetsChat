import { Avatar, IconButton } from '@material-ui/core'
import { AddAlert, Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import SideBarChat from './SideBarChat'
import './sidebar.css'
import axios from 'axios'
import Pusher from 'pusher-js'
import {Dots, Sentry, Spinner} from 'react-activity';
import { render } from 'react-dom';
import 'react-activity/dist/react-activity.css';
function SideBar({currRoom}) {

    const change=(name)=>{
        currRoom(name)
    }
    const [rooms,setRooms]=useState([])
    const [loaded,setLoaded]=useState(false)
    useEffect(()=>{

        axios.get('http://localhost:8080/getRooms')
        .then(res=>{
            setRooms(res.data.reverse())
            setLoaded(true)
            
        }).catch(e=>{
            console.log(e);
        })
    },[])

    useEffect(() => {
        console.log('subscriber created');
        const pusher = new Pusher('3e888fccfeb395bd6cc6', {
          cluster: 'ap2'
        });
      
        const channel = pusher.subscribe('room');
        channel.bind('addRoom', function(data) {
          //alert(JSON.stringify(data));
         
          setRooms([data,...rooms]);
        });
        console.log(rooms);
        return ()=>{
          channel.unbind_all();
          channel.unsubscribe();
          console.log('unsubscribed');
        }
        
       
      }, [rooms])


   const createChat=()=>{
       const roomName=prompt('Enter Room Name');
       if(roomName){
           //call api 
           axios.post('http://localhost:8080/addRoom',{
               name:roomName
           }).then(res=>console.log('data added'))
           .catch(e=>console.log(e))
       }
   }

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
            <div  onClick={createChat} className="whole" >
            <h2>Add new Chat</h2>
        </div>
            <div  className="sidebarchat">
            
     
           {
        
            !loaded ? <div className="roller"><Spinner /></div> : <div>
                {  rooms.map((room)=>(
                    <div onClick={()=>change(room.name)}> <SideBarChat   room={room}/></div>
                 ))
                }
               </div>
             }
               
          

              </div>
        </div>
    )
}

export default SideBar
