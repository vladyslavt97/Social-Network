const express = require("express");
const { updateUsersBio } = require('../db');


const uploadBioRouter = express.Router();
uploadBioRouter.post('/bioupload', (req, res) => {
    console.log('reqses', req.body);
    let bio = req.body.textarea;
    let id = req.session.userId;
    console.log('bio and id: ', bio, id);
    updateUsersBio(bio, id)
        .then((data) => {
            console.log('bio upload: ', data.rows);
            res.json({uploadedBio: true, myBio: data});
        })
        .catch(err =>{
            res.json({uploadedBio: false});

            console.log('the error: ', err);
        });
});

module.exports = { uploadBioRouter };