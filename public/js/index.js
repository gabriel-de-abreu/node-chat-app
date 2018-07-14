var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');    
});

socket.on('newMessage',(message)=>{
    console.log('new message', message);
    var li = $('<li></li>');
    li.text(`${message.from}:${message.text}`);
    $('#messages').append(li);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
}); 

$('#message-form').on('submit',(e)=>{
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: $('[name=message]').val()
    },()=>{

    });
    $("[name=message]").val('');
});