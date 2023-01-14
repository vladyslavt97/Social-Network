const express = require("express");
const { notificationsForMeInDB } = require('../../db');

const notificationsRouter = express.Router();
notificationsRouter.get('/notifications', (req, res) => {
    console.log('notifications js');
    let myId = req.session.userId;
    let status = 'FALSE';
    console.log('notifications js whats sent1', myId, '2: ', status );

    notificationsForMeInDB(myId, status)
        .then((data) => {
            console.log('time to count how many notifications are there', data);
            res.json({theAreNotifications: true, friendReqs: data, notificationsForMe: data.rows, notificationsCount: data.rowCount});
        })
        .catch(err =>{
            console.log('the error in the cheking process: ', err);
            res.json({theAre_NO_Notifications: false});
        });
});

module.exports = { notificationsRouter };