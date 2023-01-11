const express = require("express");
const { selectThreeNewestUsersFromDB } = require('../db');

const newPeopleInDB = express.Router();
newPeopleInDB.get('/newpeople', (req, res) => {
    selectThreeNewestUsersFromDB()
        .then((data) => {
            console.log('newset users', data.rows);
            res.json({newPeopleFound: true, newPeople: data.rows});
        })
        .catch(err =>{
            console.log('the error in findPeopleInDb: ', err);
            res.json({newPeopleFound: false});
        });
});

module.exports = { newPeopleInDB };