//When a user unfriends or cancels a pending request, 
//the row for the request can be deleted.

const express = require("express");
const { deleteFromReset_CodesDB } = require('../../db');

const deleteFriendReqRouter = express.Router();
deleteFriendReqRouter.get('/deletefriendreq/:id', (req, res) => {
    let me = req.session.userId;
    console.log('req.body', req.body);
    console.log('req.body', req.params);
    let anotherUser = req.params.id;
    deleteFromReset_CodesDB(me, anotherUser)
        .then((data) => {
            console.log('aaa', data);
            res.json({success: true, friendReqs: data.rows});
        })
        .catch(err =>{
            console.log('the error in deletion query: ', err);
            res.json({success: false});
        });
});

module.exports = { deleteFriendReqRouter };