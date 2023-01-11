const express = require("express");
const { findPeopleInDB } = require('../db');

const findPeopleRouter = express.Router();
findPeopleRouter.post('/findpeople', (req, res) => {
    let peopleName = req.body.people;
    if(peopleName !== ''){
        findPeopleInDB(peopleName)
            .then((data) => {
                res.json({peopleFound: true, myPeople: data.rows});
            })
            .catch(err =>{
                console.log('the error in findPeopleInDb: ', err);
            });
    } else {
        res.json({peopleFound: false});
    }
});

module.exports = { findPeopleRouter };