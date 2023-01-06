require('dotenv').config();
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const helmet = require("helmet");
const { PORT = 3001, SESSION_SECRET } = process.env;


app.use(compression());
app.use(helmet());
// use the cookie-session middleware. Look in petition project
// use json middleware for POST requests
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: SESSION_SECRET,
        maxAge: 1000*60*60*24*14
    })
);
// middleware for cookies
// const {noSignedInCookie,
//     withSignedInWithSignatureCookie} = require("./middleware");


//


//Add the middleware that makes sure that our server parses incoming json/application requests
//We need this so that we can access values in our req.body more easily (refer to the imageboard project)
app.use(express.json());
//


app.use(express.static(path.join(__dirname, "..", "client", "public")));

const { loginRouter } = require('./routes/login');
const { registerRouter } = require('./routes/registration');
const { resetRouter } = require('./routes/reset');

//
app.use(loginRouter);
app.use(registerRouter);
app.use(resetRouter);
//

//given setup below
app.get("/user/id.json", (req, res) => {
    res.json({ userId: null }); // instead of null. use value from req.session
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});