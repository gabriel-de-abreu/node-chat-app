var socket = io();
socket.on('connect', () => {
    var params = $.deparam(window.location.search);
    socket.emit('join',params,(error)=>{
        if(error){
            alert(error);
            window.location.href="/";
        }else{
            console.log("No error");
        }
    });
});

var scrollToBottom = () => {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeigth = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeigth){
        messages.scrollTop(scrollHeigth);
    }
};
socket.on('newMessage',(message)=>{
    // console.log('new message', message);
    var formattedTime= moment(message.createAt).format("h:mm a");
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt:formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}:${message.text}`);
    // $('#messages').append(li);
});

socket.on('newLocationMessage',(message)=>{
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');
    // var a =  $('<a target = "_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr("href",message.url);
    // li.append(a);
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