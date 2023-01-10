const express = require("express");
const { updateUsersBio } = require('../db');


const uploadBioRouter = express.Router();
uploadBioRouter.post('/bioupload', (req, res) => {
    let bio = req.body.textarea;
    let id = req.session.userId;
    updateUsersBio(bio, id)
        .then((data) => {
            res.json({uploadedBio: true, myBio: data});
        })
        .catch(err =>{
            res.json({uploadedBio: false});

            console.log('the error: ', err);
        });
});

module.exports = { uploadBioRouter };