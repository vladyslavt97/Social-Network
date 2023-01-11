const express = require("express");
const { updateUsersBio } = require('../db');


const uploadBioRouter = express.Router();
uploadBioRouter.post('/bioupload', (req, res) => {
    let bio = req.body.textarea;
    let id = req.session.userId;
    if(bio !== ''){
        updateUsersBio(bio, id)
            .then((data) => {
                res.json({bioAdded: true, myBio: data.rows});
            })
            .catch(err =>{

                console.log('the error: ', err);
            });
    } else {
        res.json({bioAdded: false});
    }
});

module.exports = { uploadBioRouter };