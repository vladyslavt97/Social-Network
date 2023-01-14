//When one user sends another a friend request
//a row would be inserted with the ids of the sender
//and receiver in the appropriate columns and the boolean set to false.

const express = require("express");
const { insertIntoReset_CodesDB } = require('../../db');

const insertFriendReqRouter = express.Router();
insertFriendReqRouter.post('/insertfriendreq/:id', (req, res) => {
    // console.log('trying to insert');
    let sender_id = req.session.userId;
    let recipient_id = req.params.id;
    // console.log('s r@ ', sender_id, recipient_id);
    insertIntoReset_CodesDB(sender_id, recipient_id)
        .then((data) => {
            // console.log('data in insert', data);
            res.json({success: true, insertedFriendReq: data});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { insertFriendReqRouter };