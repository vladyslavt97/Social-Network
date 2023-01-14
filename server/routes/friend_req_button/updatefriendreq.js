//When a user accepts a friend request,
//the appropriate row would be updated to set the boolean to true. 

const express = require("express");
const { updateReset_CodesDB } = require('../../db');

const updateFriendReqRouter = express.Router();
updateFriendReqRouter.post('/updatefriendshipreq/:id', (req, res) => {
    console.log('trying to update');
    console.log('the insert should run');
    let sender_id = req.session.userId;
    let recipient_id = req.params.id;
    let status = 'true';
    // console.log('s r@ ', sender_id, recipient_id);
    updateReset_CodesDB(sender_id, recipient_id, status)
        .then((data) => {
            console.log('data in update', data.rows);
            res.json({success: true, updatedFriendReqs: data});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { updateFriendReqRouter };