const express = require("express");
const { myFriendsInDB } = require('../db');

const friendsRouter = express.Router();
friendsRouter.get('/friends', (req, res) => {
    let myId = req.session.userId;
    let status = 'TRUE';
    myFriendsInDB(myId, status)
        .then((data) => {
            res.json({success: true, myFriends: data.rows});
        })
        .catch(err =>{
            console.log('the error in the friends process: ', err);
            res.json({success: false});
        });
});

module.exports = { friendsRouter };