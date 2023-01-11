const express = require("express");
const { selectAllDataFromUsersDB } = require('../db');

const userRouter = express.Router();
userRouter.get('/user', (req, res) => {
    let matchForUser;
    let id = req.session.userId;
    selectAllDataFromUsersDB(id)//get all info about the user + pp
        .then((data) => {
            matchForUser = data.rows.find(el => {//match for email
                return el.id === id;
            });
            res.json({success: true, userData: matchForUser});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { userRouter };
