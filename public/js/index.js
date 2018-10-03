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
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('New message', message); // eslint-disable-line
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

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

var locationButton = jQuery('#send-location');

locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not support by your browser.');
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        function() {
            alert('Unable to fetch location.');
        }
    );
});
