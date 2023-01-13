//When one user sends another a friend request
//a row would be inserted with the ids of the sender
//and receiver in the appropriate columns and the boolean set to false.

const express = require("express");
const { checkFriendReqInDB } = require('../../db');

const checkFriendReqRouter = express.Router();
checkFriendReqRouter.get('/checkfriendreq', (req, res) => {
    let matchForUser;
    let id = req.session.userId;
    checkFriendReqInDB(id)
        .then((data) => {
            matchForUser = data.rows.find(el => {
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