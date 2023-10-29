const express = require("express")
const app = express()

const server = require("http").createServer(app)

const io = require("socket.io")(server, {
    cors:{
        origin:"*"
    }
})

// establishing connection
io.on("connection", (socket)=>{
    console.log("What is a socket: ", socket);
    console.log("Socket is active to be connected");

    // sending and receiving packets of data => broadcasting
    socket.on("chat", (payload)=>{
        console.log("What is payload: ", payload);
        io.emit("chat", payload) // communicating | sending back the payload we received
    })
})

// not on main server
// app.listen(5000, ()=>{
//     console.log("Server is running on port 5000");
// })

server.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})




