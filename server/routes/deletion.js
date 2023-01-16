const express = require("express");
const { deleteUserAndFriendshipsDB } = require('../db');

const deleteMyUserRouter = express.Router();
deleteMyUserRouter.post('/deletemyaccount', (req, res) => {
    let myId = req.session.userId;
    deleteUserAndFriendshipsDB(myId)
        .then((data) => {
            req.session = null;
            res.json({success: true, deleteMyAccount: data});
        })
        .catch(err =>{
            console.log('the error in deletion query: ', err);
            res.json({success: false});
        });
});

module.exports = { deleteMyUserRouter };