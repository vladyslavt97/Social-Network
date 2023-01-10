const express = require("express");
const { uploader, fileUpload } = require('../file-upload');
const { updateUsersPPUrl } = require('../db');


const uploadPPRouter = express.Router();
uploadPPRouter.post('/upload', uploader.single('uploadedfile'), fileUpload, (req, res) => {
    console.log('res.locals: ', res.locals);
    let profile_pic_url = res.locals.fileUrl; //comes from fileUpload?
    let id = req.session.userId; //should be saved in the cookie?
    updateUsersPPUrl(profile_pic_url, id)
        .then((data) => {
            console.log('???', req.file);
            if (req.file){
                console.log('successsss in the update query of the pic url');
                console.log('?', data);
                res.json({uploaded: true, myPic: profile_pic_url});
            }else{
                res.json({uploaded: false});
            }
        })
        .catch(err =>{
            console.log('the error: ', err);
        });
});

module.exports = { uploadPPRouter };