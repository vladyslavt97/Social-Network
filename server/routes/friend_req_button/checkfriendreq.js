// The GET route should send back to the client the information that is required for the FriendButton to render when it mounts.
// the status of the button based on DB
const express = require("express");
const { checkFriendReqInDB } = require('../../db');

const checkFriendReqRouter = express.Router();
checkFriendReqRouter.get('/checkfriendreq/:id', (req, res) => {
    let thatsMe;
    let me = req.session.userId;
    let anotherUser = req.params.id;
    checkFriendReqInDB(me, anotherUser)
        .then((data) => {
            thatsMe = data.rows.find(el => {
                return el.recipient_id === req.session.userId;
            });
            res.json({success: true, friendReqs: data, foundMyself: thatsMe});
        })
        .catch(err =>{
            console.log('the error in the cheking process: ', err);
            res.json({success: false});
        });
});

module.exports = { checkFriendReqRouter };