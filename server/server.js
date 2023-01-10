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

app.use(loginRouter);
app.use(registerRouter);
app.use(resetRouter);
app.use(uploadPPRouter);
app.use(userRouter);


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