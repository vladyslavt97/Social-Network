const express = require("express");
const { uploader, fileUpload } = require('../file-upload');
const { insertIntoProfilePics } = require('../db');


const changePPRouter = express.Router();
changePPRouter.post('/change-profile-pic', uploader.single('filee'), fileUpload, (req, res) => {
    let profile_pic_url = res.locals.fileUrl; //comes from fileUpload?
    let user_id; //should be saved in the cookie?
    insertIntoProfilePics(user_id, profile_pic_url)
        .then((data) => {
            if (req.file){
                res.json({uploaded: true, myPic: data});
            }else{
                res.json({uploaded: false});
            }
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
});

module.exports = { changePPRouter };