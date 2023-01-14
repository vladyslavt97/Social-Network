// The GET route should send back to the client the information that is required for the FriendButton to render when it mounts.
// the status of the button based on DB

//1. If there is nothing
//2. if there is something for my cookie id in the db

const express = require("express");
const { checkFriendReqInDB } = require('../../db');

const checkFriendReqRouter = express.Router();
checkFriendReqRouter.get('/checkfriendreq/:id', (req, res) => {
    // let matchForUser;
    let me = req.session.userId;
    let anotherUser = req.params.id;
    console.log('anotherUser', anotherUser);
    checkFriendReqInDB(me, anotherUser)//get all info about the user + pp
        .then((data) => {
            // matchForUser = data.rows.find(el => {//match for email
            //     return el.id === me;
            // });
            console.log('got here', data);
            res.json({success: true, friendReqs: data});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { checkFriendReqRouter };