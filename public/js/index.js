var socket = io(); // eslint-disable-line

socket.on('connect', function() {
    console.log('Connected to server'); // eslint-disable-line
});

socket.on('disconnect', function() {
    console.log('Disconnected from server'); // eslint-disable-line
});

socket.on('newMessage', function(message) {
    console.log('New message', message); // eslint-disable-line
});
