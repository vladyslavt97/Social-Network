const express = require("express");
const { findFriendsInDB } = require('../db');

const findPeopleRouter = express.Router();
findPeopleRouter.post('/findpeople', (req, res) => {
    console.log('req.body in (findpeople) foundPeople:', req.body);
    let peopleName = req.body.foundPeople;
    if(peopleName !== ''){
        findFriendsInDB(peopleName)
            .then((data) => {
                // console.log('data rows in foundPeople', data.rows);
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