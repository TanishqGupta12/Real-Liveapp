const server = require('express');
const app = server();

const http = require('http').createServer(app)
const Port = process.env.Port || 1212 ;


http.listen(Port ,()=>{
    console.log(`http://localhost:${Port}/ `);
})

app.use(server.static(__dirname + '/Public'))

app.get('/' ,(req, res)=>{
    res.sendFile(__dirname + "/index.html")
})


// socket

const io = require('socket.io')(http)

io.on('connection', (socket)=>{ 
    console.log("Connected......");

    socket.on('message', (msg) =>{
        socket.broadcast.emit('message' , msg)
    })
})