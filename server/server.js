const path = require('path');
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000; 
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.emit('newMessage',{
        from: "me",
        text:"hey",
        createAt: 321321
    });
    
    
    socket.on('disconnect',()=>{
        console.log("batata");
    });

    socket.on('createMessage',(message)=>{
        console.log('Create Message',message);
    });  
});



server.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});