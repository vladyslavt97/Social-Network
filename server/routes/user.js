const express = require("express");
const { selectUserAndProfilePic } = require('../db');

const userRouter = express.Router();
userRouter.get('/user', (req, res) => {
    let user_id = req.session.userId;
    let id = req.session.userId;
    console.log('asdasdas', id, user_id);
    selectUserAndProfilePic(id, user_id)//get all info about the user + pp
        .then((data) => {
            console.log('query to get all data full outer join', data.rows);
            res.json({success: true, userData: data.rows});
        })
        .catch(err =>{
            console.log('the error: ', err);
            res.json({success: false});
        });
});

module.exports = { userRouter };
