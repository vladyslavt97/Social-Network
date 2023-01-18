import { io } from 'socket.io-client';

export const socket = io.connect();

socket.on('welcome', (msg) => {
    console.log(msg);
    socket.emit('thanks', {
        message: 'Thank you. It is great to be here.'
    });
});