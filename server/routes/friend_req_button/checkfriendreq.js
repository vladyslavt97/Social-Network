// The GET route should send back to the client the information that is required for the FriendButton to render when it mounts.
// the status of the button based on DB

//1. If there is nothing
//2. if there is something for my cookie id in the db

const express = require("express");
const { checkFriendReqInDB } = require('../../db');

const checkFriendReqRouter = express.Router();
checkFriendReqRouter.get('/checkfriendreq', (req, res) => {
    let matchForUser;
    let id = req.session.userId;
    checkFriendReqInDB(id)//get all info about the user + pp
        .then((data) => {
            matchForUser = data.rows.find(el => {//match for email
                return el.id === id;
            });
            res.json({success: true, userData: matchForUser});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { checkFriendReqRouter };