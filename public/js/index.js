var socket = io(); // eslint-disable-line

socket.on('connect', function() {
    console.log('Connected to server'); // eslint-disable-line
});

socket.on('disconnect', function() {
    console.log('Disconnected from server'); // eslint-disable-line
});

socket.on('newMessage', function(message) {
    console.log('New message', message); // eslint-disable-line
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: jQuery('[name=message]').val()
        },
        function() {}
    );
});
