const express = require("express");
const { myFriendsInDB } = require('../db');

const friendsRouter = express.Router();
friendsRouter.get('/friendss', (req, res) => {
    let myId = req.session.userId;
    myFriendsInDB(myId)
        .then((data) => {
            const withoutMe = data.rows.filter(meOut=>{
                // console.log('meOut', meOut);

                return meOut.id !== req.session.userId;
            });
            console.log('withoutMe', withoutMe);
            // console.log('friendsss: ', data.rows);
            // console.log('req.session.userId: ', req.session.userId);
            res.json({success: true, myFriends: withoutMe});
        })
        .catch(err =>{
            console.log('the error in the friends process: ', err);
            res.json({success: false});
        });
});

module.exports = { friendsRouter };