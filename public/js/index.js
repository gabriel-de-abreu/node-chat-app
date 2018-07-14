var socket = io();
socket.on('connect', () => {
});

socket.on('newMessage',(message)=>{
    // console.log('new message', message);
    var li = $('<li></li>');
    li.text(`${message.from}:${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage',(message)=>{
    var li = $('<li></li>');
    var a =  $('<a target = "_blank">My current location</a>');
    li.text(`${message.from}:`);
    a.attr("href",message.url);
    li.append(a);
    $('#messages').append(li);
});

socket.on('disconnect', () => {
}); 

$('#message-form').on('submit',(e)=>{
    var messageTextBox=$('[name=message]');
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    },()=>{
        messageTextBox.val('');
    });
});

var locationButton = $("#send-location");
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        return alert("Geolocation not supported!");
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    },()=>{
        alert('unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});