//When a user accepts a friend request,
//an appropriate row would be updated to set the boolean to true. 

const express = require("express");
const { updateReset_CodesDB } = require('../../db');

const updateFriendReqRouter = express.Router();
updateFriendReqRouter.post('/updatefriendshipreq/:id', (req, res) => {
    let sender_id = req.session.userId;
    let recipient_id = req.params.id;
    let status = 'true';
    updateReset_CodesDB(sender_id, recipient_id, status)
        .then((data) => {
            res.json({success: true, updatedFriendReqs: data});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { updateFriendReqRouter };