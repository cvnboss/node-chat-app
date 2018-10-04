var socket = io(); // eslint-disable-line

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
    ) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    console.log('Connected to server'); // eslint-disable-line
});

socket.on('disconnect', function() {
    console.log('Disconnected from server'); // eslint-disable-line
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a'); // eslint-disable-line

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, { // eslint-disable-line
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a'); // eslint-disable-line

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, { // eslint-disable-line
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);

    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: messageTextbox.val()
        },
        function() {
            messageTextbox.val('');
        }
    );
});

var locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not support by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(
        function(position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        },
        function() {
            locationButton.removeAttr('disabled');
            alert('Unable to fetch location.').text('Send location');
        }
    );
});
