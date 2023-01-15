const express = require("express");
const { deleteUserAndFriendshipsDB } = require('../db');

const deleteMyUserRouter = express.Router();
deleteMyUserRouter.post('/deletemyaccount', (req, res) => {
    console.log('the delete of my user should run');
    let myId = req.session.userId;
    deleteUserAndFriendshipsDB(myId)
        .then((data) => {
            console.log('success. deleted');
            console.log('req.session bef', req.session);

            res.json({success: true, deleteMyAccount: data});
            req.session = null;
            console.log('req.session', req.session);

        })
        .catch(err =>{
            console.log('the error in deletion query: ', err);
            res.json({success: false});
        });
});

module.exports = { deleteMyUserRouter };