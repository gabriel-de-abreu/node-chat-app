var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');    
});

socket.on('newMessage',(message)=>{
    console.log('new message', message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
}); 

socket.emit('createMessage',{
    from: "fulano",
    text: "hi"
},function(data){
    console.log(data);
});

