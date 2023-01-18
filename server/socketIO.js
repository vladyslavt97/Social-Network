require('dotenv').config();
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(WEB_URL))
});
const { WEB_URL } = process.env;

let userIdentification = 0;
let userOnline = [];
module.exports = io.on('connection', function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    userOnline.push({socketId: socket.id, user: userIdentification++});

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    socket.on('thanks', function(data) {
        console.log(data);
    });

    socket.emit('welcome', {
        message: 'Welome. It is nice to see you'
    });
});