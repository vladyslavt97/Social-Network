// The GET route should send back to the client the information that is required for the FriendButton to render when it mounts.
// the status of the button based on DB
const express = require("express");
const { checkFriendReqInDB } = require('../../db');

const checkFriendReqRouter = express.Router();
checkFriendReqRouter.get('/checkfriendreq/:id', (req, res) => {
    let thatsMe;
    let me = req.session.userId;
    let anotherUser = req.params.id;
    // console.log('anotherUser', anotherUser);
    checkFriendReqInDB(me, anotherUser)//get all info about the user + pp
        .then((data) => {
            thatsMe = data.rows.find(el => {//match for email
                // console.log('el', el.recipient_id);
                // console.log('rows', data.rows);
                // console.log('session: ', req.session.userId);
                return el.recipient_id === req.session.userId;
            });
            // console.log('?? wierd: ', thatsMe);
            res.json({success: true, friendReqs: data, foundMyself: thatsMe});
        })
        .catch(err =>{
            console.log('the error in the cheking process: ', err);
            res.json({success: false});
        });
});

module.exports = { checkFriendReqRouter };