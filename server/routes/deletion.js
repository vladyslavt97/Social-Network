const express = require("express");
const { deleteUserAndFriendshipsDB, selectAllDataFromUsersDBBasedOnId } = require('../db');
const { deleteObject } = require('../file-upload');

const deleteMyUserRouter = express.Router();
deleteMyUserRouter.post('/deletemyaccount', (req, res) => {
    let myId = req.session.userId;
    let id = req.session.userId;
    selectAllDataFromUsersDBBasedOnId(id)
        .then((data) => {
            const params = {
                Bucket: "spicedling",
                Key: data.rows[0].profile_pic_url.split("spicedling/")[1],
            };
            deleteObject(params);
            return deleteUserAndFriendshipsDB(myId);
        })
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