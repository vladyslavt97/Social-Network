

const express = require("express");
const { uploader, fileUpload } = require('../file-upload');
const { updateUsersPPUrl, selectAllDataFromUsersDBBasedOnId } = require('../db');
const { deleteObject } = require('../file-upload');


const uploadPPRouter = express.Router();
uploadPPRouter.post('/upload', uploader.single('uploadedfile'), fileUpload, (req, res) => {
    let profile_pic_url = res.locals.fileUrl; //comes from fileUpload?
    let id = req.session.userId; //should be saved in the cookie?
    selectAllDataFromUsersDBBasedOnId(id)
        .then((data) => {
            // console.log('of user', data);
            if(data.rows[0].profile_pic_url !== null){
                const params = {
                    Bucket: "spicedling",
                    Key: data.rows[0].profile_pic_url.split("spicedling/")[1],
                };
                deleteObject(params);
            }
            return updateUsersPPUrl(profile_pic_url, id);
        })
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

module.exports = { uploadPPRouter };