require('dotenv').config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT, WEB_URL} = process.env;
const {cookieSession } = require('./cookiesession');
app.use(cookieSession);
// ------------------------------------ SOCKET  ------------------------------------ //
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(WEB_URL))
});

io.use((socket, next) => {
    cookieSession(socket.request, socket.request.res, next);
});
io.on("connection", async (socket) => {
    console.log("[social:socket] incoming socket connection", socket.id);
    // const { userId } = socket.request.session;
    // if (!userId) {
    //     return socket.disconnect(true);
    // }

    // retrieve the latest 10 messages
    // const latestMessages = ...
    // and send them to the client who has just connected
    socket.emit('chatMessages', [
        {
            text: 'A first message'
        },
        {
            text: 'A second message'
        }
    ]);

    // listen for when the connected user sends a message
    socket.on('chatMessage', (text) => {
    // store the message in the db
    //    const newMessage = ...

    // then broadcast the message to all connected users (included the sender!)
    // hint: you need the sender info (name, picture...) as well
    // how can you retrieve it?
    //    io.emit('chatMessage', ...);
    });
});
// ------------------------------------ end of socket setup  ------------------------------------ //


app.use(compression());

//Add the middleware that makes sure that our server parses incoming json/application requests. 
//We need this so that we can access values in our req.body more easily
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));


const { loginRouter } = require('./routes/login');
const { registerRouter } = require('./routes/registration');
const { resetRouter } = require('./routes/reset');
const { uploadPPRouter } = require('./routes/uploadPP');
const { userRouter } = require('./routes/user');
const { uploadBioRouter } = require('./routes/bio');
const { findPeopleRouter } = require('./routes/findpeople');
const { newPeopleInDB } = require('./routes/newpeople');
const { otherProfileRouter } = require('./routes/otherprofile');
//friend req button
const { checkFriendReqRouter } = require('./routes/friend_req_button/checkfriendreq');
const { insertFriendReqRouter } = require('./routes/friend_req_button/insertfriendreq');
const { deleteFriendReqRouter } = require('./routes/friend_req_button/deletefriendreq');
const { updateFriendReqRouter } = require('./routes/friend_req_button/updatefriendreq');
//
const { notificationsRouter } = require('./routes/notifications/notifications');
const { friendsRouter } = require('./routes/friends');
const { deleteMyUserRouter } = require('./routes/deletion');


app.use(loginRouter);
app.use(registerRouter);
app.use(resetRouter);
app.use(uploadPPRouter);
app.use(userRouter);
app.use(uploadBioRouter);
app.use(findPeopleRouter);
app.use(newPeopleInDB);
app.use(otherProfileRouter);
//
app.use(checkFriendReqRouter);
app.use(insertFriendReqRouter);
app.use(deleteFriendReqRouter);
app.use(updateFriendReqRouter);
//
app.use(notificationsRouter);
app.use(friendsRouter);
app.use(deleteMyUserRouter);

//given setup below
app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.post('/signout', (req, res) => {
    req.session = null;
    res.json({ userId: null });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});

// ----------
//  ---- SOCKET --- //??????
// let userIdentification = 0;
// let userOnline = [];
// io.on('connection', function(socket) {
//     console.log(`socket with the id ${socket.id} is now connected`);

//     userOnline.push({socketId: socket.id, user: userIdentification++});

//     socket.on('disconnect', function() {
//         console.log(`socket with the id ${socket.id} is now disconnected`);
//     });

//     socket.on('thanks', function(data) {
//         console.log(data);
//     });

//     socket.emit('welcome', {
//         message: 'Welome. It is nice to see you'
//     });
// });