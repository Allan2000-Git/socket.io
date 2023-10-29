import { useEffect, useState } from 'react'
import './App.css'
import io from "socket.io-client"
import {nanoid} from "nanoid"

const socket = io.connect("http://localhost:5000")
const username = nanoid(5) // random numbers between 1 and 5

function App() {

  const [message, setMessage] = useState(""); // single message
  const [chats, setChats] = useState([]); // for all the messages

  const sendMessage = (e)=>{
    e.preventDefault()

    // same name as given in the backend
    const data = {message, username}
    socket.emit("chat", data)
    setMessage("")
  }

  useEffect(()=>{
    socket.on("chat", (payload)=>{
      setChats([...chats, payload])
    })
  })

  return (
    <>
      <h1>Chat Me!</h1>
      {
        chats.map((chat, index)=>{
          return(
            <p key={index}>{chat.message} <span>id: {chat.username}</span></p>
          )
        })
      }
      <form onSubmit={sendMessage}>
        <input type="text" name="message" value={message} onChange={(e)=>setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
