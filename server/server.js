const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user was connected'); // eslint-disable-line

    socket.emit('newMessage', {
        from: 'Long',
        text: 'Rock on',
        createdAt: 123
    });

    socket.on('createMessage', message => {
        console.log('createMessage', message); // eslint-disable-line
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected'); // eslint-disable-line
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`); // eslint-disable-line
});

module.exports = { app };
