require('dotenv').config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { PORT, WEB_URL} = process.env;
const {cookieSession } = require('./cookiesession');
app.use(cookieSession);

const { getLatestMessages, insertMessage, 
    // selectAllDataFromUsersDBBasedOnId 
} = require('./db');

// ------------------------------------ SOCKET  ------------------------------------ //
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith(WEB_URL))
});

io.use((socket, next) => {
    cookieSession(socket.request, socket.request.res, next);
});
let usersConnectedInfo = [];
io.on("connection", async (socket) => {
    console.log("[social:socket] incoming socket connection", socket.id);
    
    

    //check if the user is signed in.
    const { userId } = socket.request.session;
    if (!userId) { // I am not going to send data if a user is not signed in
        return socket.disconnect(true);
    }

    

    //tracking connected users
    let alreadyExist = usersConnectedInfo.find(el => el.usersId === userId);
    console.log('alreadyExist: ', alreadyExist);

    if(!alreadyExist){
        usersConnectedInfo.push({
            usersId: userId, 
            socketId: [socket.id]});
        console.log('TRACKING usersConnectedInfo: ', usersConnectedInfo);
    } else {
        alreadyExist.socketId.push(socket.id);
        // usersConnectedInfo.push({
        //     usersId: userId, 
        //     socketId: [socket.id]});
        console.log('TRACKING usersConnectedInfo: ', usersConnectedInfo);
    }
    // let onlineUsers = Object.values(usersConnectedInfo.userId);
    // console.log(onlineUsers);
            
    // // online users!
    // const id = userId;
    // const onlineUser = await selectAllDataFromUsersDBBasedOnId(id);
    // socket.emit('online', onlineUser.rows);
    // // console.log(userId, 'should be emited to server.js');
    // // usersConnectedInfo.forEach(each=>console.log("each",each));



    // retrieve the latest 10 messages from DB
    const latestMessages = await getLatestMessages();
    // console.log('should get new messages from DB', latestMessages);
    // and send them to the client who has just connected
    socket.emit('chatMessages', latestMessages);






    // listen for when the connected user sends a message later
    socket.on('private_message', async (dataClient) => {
    // store the message in the db
        console.log('dataClient: ', dataClient.messageState, 'id: ', dataClient.selectedFriendId);
        let recipient_id = dataClient.selectedFriendId;
        let oneMessage = dataClient.messageState;
        const newMessage = await insertMessage(userId, recipient_id, oneMessage);
        console.log('nm in server.js', newMessage.rows[0]);
        console.log('dataClient: ', dataClient);
        let foundSocket = usersConnectedInfo.find(el => el.usersId === dataClient.selectedFriendId);
        console.log('fs: ', foundSocket);
        io.to(foundSocket.socketId[0]).emit('private_message', {
            info: newMessage.rows[0], 
            senderId: socket.id});

        socket.emit('private_message', {
            info: newMessage.rows[0], 
            senderId: socket.id});

    });
    socket.on("disconnect", () => {
        console.log(socket.id, '= should disappear from the list on onlinne users');
        const indexOf = usersConnectedInfo.findIndex(el => el.socketId === socket.id);
        console.log('indexOf: ', indexOf);
        let spliced = usersConnectedInfo.splice(indexOf, 1);
        console.log('1', usersConnectedInfo, '2@: ', spliced);
    });




    // //call a user by id
    // socket.on("callUser", (data) => {
    //     //data - should be passed from Client
    //     io.to(data.userToCall).emit("callUser", {
    //         signal: data.signalData, 
    //         from: data.from, 
    //         name: data.name 
    //     });
    // });

    // //answer the call
    // socket.on("answerCall", (data) => {
    //     io.to(data.to).emit("callAccepted", data.signal);
    // });
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
const { mutualFriendsRouter } = require('./routes/mutual-friends');


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
app.use(mutualFriendsRouter);

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