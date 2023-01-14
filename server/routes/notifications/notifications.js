const express = require("express");
const { notificationsForMeInDB } = require('../../db');

const notificationsRouter = express.Router();
notificationsRouter.get('/notifications', (req, res) => {
    let myId = req.session.userId;
    let status = 'FALSE';
    notificationsForMeInDB(myId, status)
        .then((data) => {
            res.json({theAreNotifications: true, notificationsForMe: data.rows, notificationsCount: data.rowCount});
        })
        .catch(err =>{
            console.log('the error in the cheking process: ', err);
            res.json({theAre_NO_Notifications: false});
        });
});

module.exports = { notificationsRouter };