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
function SideBar({currRoom,photoURL}) {

    const change=(name)=>{
        currRoom(name)
    }
    const [rooms,setRooms]=useState([])
    const [loaded,setLoaded]=useState(false)
    const[counter,setCounter]=useState(0);
    const [changeer,setc]=useState(false)
    useEffect(()=>{

        
        axios.get('https://letschatbackend.herokuapp.com/getRooms')
        .then(res=>{
            setRooms(res.data)
            setLoaded(true)
            change(res.data.reverse()[0].name)

            
        }).catch(e=>{
            console.log(e);
        })

        
     //   console.log('dd');
    },[])

    const afterSearch=()=>{
         
        axios.get('https://letschatbackend.herokuapp.com/getRooms')
        .then(res=>{
            setRooms(res.data)
            setLoaded(true)
            change(res.data.reverse()[0].name)

            
        }).catch(e=>{
            console.log(e);
        }) 
    }
         


    useEffect(() => {
     //   console.log('subscriber created');
     var pusher = new Pusher('f9079a0d6790d52fcce8', {
        cluster: 'ap2'
      });
  //    console.log('pusher');
      
        const channel = pusher.subscribe('room');
        channel.bind('addRoom', function(data) {
          //alert(JSON.stringify(data));
         
          setRooms([...rooms,data].reverse());
        });
       // console.log(rooms);
        return ()=>{
       //     console.log('pusher closed' );
          channel.unbind_all();
          channel.unsubscribe();
       //   console.log('unsubscribed');
        }
        
       
      }, [rooms,changeer])


   const createChat=()=>{
       const roomName=prompt('Enter Room Name');
       if(roomName){
           //call api 
           axios.post('https://letschatbackend.herokuapp.com/addRoom',{
               name:roomName
           }).then(res=>{

            if(changeer)
            setc(false)
            else
            setc(true)

           })
           .catch(e=>console.log(e))
       }
      
       
   }

const search=(e)=>{
  //  alert(e.target.value)

    if(e.target.value=='')
    afterSearch()
    let newarr=rooms.filter((r)=>r.name.startsWith(e.target.value))
    setRooms(newarr)
    
}

    return (
        <div className="sidebar">
         
            <div className="sidebarhead">
             <Avatar src={photoURL}></Avatar>
             <div className="sidebarrightheader">
                 <IconButton><DonutLarge></DonutLarge></IconButton>
                 
                <IconButton> <Chat></Chat></IconButton>
                <IconButton> <MoreVert></MoreVert></IconButton>
             </div>
             
            </div>
            <div className="sidebarsearch">
                <div className="searchContainer">
                <SearchOutlined></SearchOutlined>
                <input   onChange={search}  type="text" placeholder="Search Chat or start a new one"></input>
                </div>
              
            </div>
            <div  onClick={createChat} className="wholer" >
            <h2>Add new Chat</h2>
        </div>
            <div  className="sidebarchat">
           
           {
        
            !loaded ? <div className="roller"><Spinner /></div> : <div>
                {  rooms.map((room)=>(
                    <div  key={room.id}  onClick={()=>change(room.name)}> <SideBarChat   room={room}/></div>
                 ))
                }
               </div>
             }
               
          

              </div>
        </div>
    )
}

export default SideBar
