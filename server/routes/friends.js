const express = require("express");
const { myFriendsInDB } = require('../db');

const friendsRouter = express.Router();
friendsRouter.get('/friendss', (req, res) => {
    let myId = req.session.userId;
    myFriendsInDB(myId)
        .then((data) => {
            res.json({success: true, myFriends: data.rows});
        })
        .catch(err =>{
            console.log('the error in the friends process: ', err);
            res.json({success: false});
        });
});

module.exports = { friendsRouter };