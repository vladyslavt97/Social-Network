const express = require("express");
const { otherProfileInDB } = require('../db');

const otherProfileRouter = express.Router();
otherProfileRouter.get(`/userprofile/:id`, (req, res) => {
    // console.log('req.body in otherProfile:', req.body);
    console.log('req.params in otherProfile:', req.params.id);
    const id = req.params.id;
    console.log('the id: ', id);
    otherProfileInDB(id)
        .then((data) => {
            console.log('sucess123');
            res.json({peopleFound: true, otherProfile: data.rows});
        })
        .catch(err =>{
            console.log('the error in findPeopleInDb: ', err);
        });
});

module.exports = { otherProfileRouter };