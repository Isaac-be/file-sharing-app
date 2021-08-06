import React, { useState } from "react";
import io from "socket.io-client";
import './App.css';

function App() {
  let [messages, setMessages] = useState(["This is a message"]);
  let [state, setState] = useState({
    newMsg : "",
    file : ""
  });

  const socket = io('http://localhost:5000', { transports: ['websocket'] });


  socket.on('message', ({ data }) => {
    console.log(data);
    setMessages([...messages, data]);
  })

  const handleChange = (e) => {
    let { name , value } = e.target;
    setState({
      ...state,
      [name] : value
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message', { data: state.newMsg });
    // setMessages([...messages , newMsg]);
    setState({
      newMsg : '',
      file : ''
    });
  }

  return (
    <div className="App" style={{ padding: '30px' }}>
      <form onSubmit={sendMessage}>
        <input type="text" name="newMsg" onChange={handleChange} value={state.newMsg} />
        {/* <input type="file" name="file" value={state.file} onChange={handleChange} /> */}
        <button type="submit">Send Message</button>
      </form>
      <div>
        <ul>
          {
            messages.map((msg, i) => <li key={i}>
              {msg}
            </li>)
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
