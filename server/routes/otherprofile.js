const express = require("express");
const { otherProfileInDB } = require('../db');

const otherProfileRouter = express.Router();
otherProfileRouter.get(`/userprofile/:id`, (req, res) => {
    // console.log('req.body in otherProfile:', req.body);
    const id = req.params.id;
    otherProfileInDB(id)
        .then((data) => {
            res.json({peopleFound: true, otherProfile: data.rows});
        })
        .catch(err =>{
            console.log('the error in findPeopleInDb: ', err);
        });
});

module.exports = { otherProfileRouter };