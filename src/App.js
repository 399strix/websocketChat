// import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001'); // Connect to server
// const socket = io.connect(); //Find a port automatically 

function App() {
  const [input, setMessages] = useState('');
  const [receive, receiveMessage] = useState('');
  const [socket_id, socketId] = useState('');
  const handleClick = () => {
    if(socket_id){
      socket.emit('send_id', {socket_id, input});
    } else{
      socket.emit('send_message', {message : input});
    }
  }; 

  useEffect(() => { 
    socket.on('receive_message', (msg) => {
      // console.log(msg);
      receiveMessage(msg.message);
    });
    socket.on('ngobrol_message', (input) => {
      // console.log(msg);
      receiveMessage(input);
    });
  }, [socket]);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <input placeholder='input...' onChange={(event) =>
        setMessages(event.target.value)
      }/>
      <button onClick={handleClick}>Send</button>
      <br/>
      {receive}

      <input placeholder='id' onChange={(event) =>
        socketId(event.target.value)
      }/>
      {/* <button onClick={tapButton}>Tap</button> */}
    </div>
  );
}

export default App;
