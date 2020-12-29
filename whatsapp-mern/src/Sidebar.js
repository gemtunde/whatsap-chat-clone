import React from 'react';
import './Sidebar.css';
import DonutLargeIcongeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined  from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';


function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src='https://pbs.twimg.com/profile_images/1198782896993124358/DjQuSq1R_400x400.jpg'/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLargeIcongeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>

            <div className='sidebar_chats'> 
                <SidebarChat  />
                <SidebarChat  />
                <SidebarChat  />
            </div>
        </div>
    )
}

export default Sidebar
