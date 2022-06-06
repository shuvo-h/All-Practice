
const express = require('express')
const cors = require("cors");
const { createServer } = require('http');
const {Server, socket} = require("socket.io");
const app = express();
const port = 5000

const http = createServer(app)

const io = new Server(http,{
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', (socket) => {
    console.log("a user connected",socket.id);
    io.on("disconnect",(socket)=>{
        console.log("a user disconnect,",socket.id);
    })
  });


app.get('/', (req, res) => {
  res.send('Hello World!')
})



http.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

