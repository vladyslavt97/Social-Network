const express = require("express");
const { selectUserAndProfilePic } = require('../db');

const userRouter = express.Router();
userRouter.get('/user', (req, res) => {
    let id = req.session.userId;
    selectUserAndProfilePic(id)//get all info about the user + pp
        .then((data) => {
            if (req.file){
                console.log('query to get all data full outer join');
                res.json({success: true, myPic: data});
            }else{
                console.log('failed');
                res.json({success: false});
            }
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
});

module.exports = { userRouter };
