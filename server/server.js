require('dotenv').config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
// const helmet = require("helmet");
// app.use(helmet());
const { PORT = 3001, SESSION_SECRET } = process.env;


app.use(compression());

const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: SESSION_SECRET,
        maxAge: 1000*60*60*24*14
    })
);

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

// app.use((req, res, next) => {
//     console.log("---------------------");
//     console.log("req.url:", req.url);
//     console.log("req.method:", req.method);
//     console.log("req.session:", req.session);
//     console.log("req.body:", req.body);
//     console.log("---------------------");
//     next();
// });

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

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});