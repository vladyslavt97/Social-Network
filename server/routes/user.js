const express = require("express");
const { selectUserAndProfilePic } = require('../db');

const userRouter = express.Router();
userRouter.get('/user', (req, res) => {
    let id;
    selectUserAndProfilePic(id)//get all info about the user + pp
        .then((data) => {
            if (req.file){
                res.json({success: true, myPic: data});
            }else{
                res.json({success: false});
            }
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
});

module.exports = { userRouter };
