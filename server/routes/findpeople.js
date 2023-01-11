const express = require("express");
const { findFriendsInDB } = require('../db');

const findPeopleRouter = express.Router();
findPeopleRouter.post('/findpeople', (req, res) => {
    console.log('resdfs:', req.body);
    let peopleName = req.body.foundPeople;
    if(peopleName !== ''){
        findFriendsInDB(peopleName)
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