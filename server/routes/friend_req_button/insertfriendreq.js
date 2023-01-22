//When one user sends another a friend request
//a row would be inserted with the ids of the sender
//and receiver in the appropriate columns and the boolean set to false.

const express = require("express");
const { insertFriendReqDB } = require('../../db');

const insertFriendReqRouter = express.Router();
insertFriendReqRouter.post('/insertfriendreq/:id', (req, res) => {
    // console.log('the insert should run');
    let sender_id = req.session.userId;
    let recipient_id = req.params.id;
    insertFriendReqDB(sender_id, recipient_id)
        .then((data) => {
            res.json({success: true, insertedFriendReq: data});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { insertFriendReqRouter };