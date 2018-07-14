const path = require('path');
const express = require('express');
const socketIO= require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000; 
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',generateMessage("Admin","Welcome to the Chat app"));
    
    socket.broadcast.emit('newMessage',generateMessage("Admin", "New user joined"));
    
    socket.on('createMessage',(message,callback)=>{
        io.emit('newMessage',generateMessage(message.from,message.text));        
        if(callback){
            callback('this is from the server');
        }
    });  

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newMessage', generateMessage('Admin',`${coords.latitude},${coords.longitude}`));
    });

    socket.on('disconnect',()=>{
        io.emit('newMessage',generateMessage("Admin","A user left the room"));        
    });
    
    
});



server.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});