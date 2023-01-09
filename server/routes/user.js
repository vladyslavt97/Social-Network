const express = require("express");
const { selectAllDataFromUsersDB } = require('../db');

const userRouter = express.Router();
userRouter.get('/user', (req, res) => {
    let id = req.session.userId;
    selectAllDataFromUsersDB(id)//get all info about the user + pp
        .then((data) => {
            res.json({success: true, userData: data.rows});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { userRouter };
