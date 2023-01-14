//When a user unfriends or cancels a pending request, 
//the row for the request can be deleted.

const express = require("express");
const { deleteFromReset_CodesDB } = require('../../db');

const deleteFriendReqRouter = express.Router();
deleteFriendReqRouter.delete('/deletefriendshipreq/:id', (req, res) => {
    console.log('the delete should run');

    let me = req.session.userId;
    let anotherUser = req.params.id;
    // console.log('me', me, 'anotherUser', req.params);
    deleteFromReset_CodesDB(me, anotherUser)
        .then((data) => {
            // console.log('aaa', data.rows);
            res.json({success: true, deletedFriendReqs: data});
        })
        .catch(err =>{
            console.log('the error in deletion query: ', err);
            res.json({success: false});
        });
});

module.exports = { deleteFriendReqRouter };