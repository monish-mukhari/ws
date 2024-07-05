import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      console.log('connected');
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      setMessage(message.data);
    }

    return (
      () => {
        socket.close();
      }
    )
  }, []);


  if(!socket) {
    return <div>
      Connecting to web socket...
    </div>
  }

  return (
    <div>
      <input onChange={(e) => {
        setInput(e.target.value);
      }}></input>
      <button onClick={() => {
        socket.send(input);
      }}>Send</button>
      {message}
    </div>
  )
}

export default App
