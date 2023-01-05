const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const helmet = require("helmet");
const { PORT = 3001 } = process.env;
const { hashPass} = require("./encrypt");
const { insertDataIntoUsersDB} = require('./db');

app.use(compression());
app.use(helmet());
// use the cookie-session middleware. Look in petition project
// use json middleware for POST requests
const cookieSession = require("cookie-session");

const {SESSION_SECRET} = process.env;
app.use(
    cookieSession({
        secret: process.env.SESSION_SECRET,
        maxAge: 1000*60*60*24*14
    })
);
//Add the middleware that makes sure that our server parses incoming json/application requests
//We need this so that we can access values in our req.body more easily (refer to the imageboard project)
app.use(express.json());
//

// middleware for cookies
// const {noSignedInCookie,
//     withSignedInWithSignatureCookie} = require("./middleware");

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//might want to use later
// const newuserRoutes = require('./routes/newuser');
// const router = express.Router();
//


//GET
//                                                                      POST
//registration post
let showError = false; 
app.post('/registration', (req, res) => {
    const {firstName, secondName, email, password} = req.body;
    hashPass(password).then((hashedPassword) => {
        // if(firstNameValues !== '' && secondNameValues !== '' && emailValue !== '' && passwordValue !== ''){
        insertDataIntoUsersDB(firstName, secondName, email, hashedPassword)
            .then((data)=>{
                showError = false, 
                req.session.signedIn = data.rows[0].id;
                res.json({ success: true, myUser: data.rows[0] });
                location.reload();
            })
            .catch((err) => {
                console.log('render error', err);
                res.json({ success: false });
                showError = true;
            });
        // } else {
        //     res.render("registration", {
        //         showError: true
        //     });
        // }
    });
});
//registration above

//given setup below
app.get("/user/id.json", (req, res) => {
    res.json({ userId: null }); // instead of null. use value from req.session
});

app.get("*", function (req, res) {
    console.log("got requested url: ", req.url);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});

//npm uninstall socket.io
