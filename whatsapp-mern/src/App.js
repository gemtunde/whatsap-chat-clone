import React, {useEffect, useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios'

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      axios.get('/messages/sync').then((response) => {
        setMessages(response.data);
      });
    },[])

    useEffect(() => {
      const pusher = new Pusher('d2db8e4e144fc6d17750', {
        cluster: 'eu'
      });  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessage) => {
        //alert(JSON.stringify(newMessage));
        setMessages([...messages, newMessage]);
      });

     return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };

    }, [messages]);

    console.log(messages);
  return (
    <div className="app">
      <h1>Lets build a Mern Whatsap Clone</h1>

      <div className='app_body'>
        {/* sidebar component */}
        <Sidebar />

         {/* chat component */}
        <Chat messages={messages} />

      </div>     

    </div>
  );
}

export default App;
