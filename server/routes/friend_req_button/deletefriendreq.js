//When a user unfriends or cancels a pending request, 
//the row for the request can be deleted.

const express = require("express");
const { deleteFromFriend_RequestsDB } = require('../../db');

const deleteFriendReqRouter = express.Router();
deleteFriendReqRouter.delete('/deletefriendshipreq/:id', (req, res) => {
    let me = req.session.userId;
    let anotherUser = req.params.id;
    console.log('me', me, 'other:@', anotherUser);
    deleteFromFriend_RequestsDB(me, anotherUser)
        .then((data) => {
            //ups
            res.json({success: true, deletedFriendReqs: data.rows});
        })
        .catch(err =>{
            console.log('the error in deletion query: ', err);
            res.json({success: false});
        });
});

module.exports = { deleteFriendReqRouter };