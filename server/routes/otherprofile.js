const express = require("express");
// const { otherProfileInDB } = require('../db');

const otherProfileRouter = express.Router();
otherProfileRouter.post(`/user/:id`, (req, res) => {
    console.log('req.body in otherProfile:', req.body);
    console.log('req.params in otherProfile:', req.params.id);
    if(peopleName !== ''){
        otherProfileInDB(peopleName)
            .then((data) => {
                const withoutMyId = data.rows.filter(el => 
                    el.id !== req.session.userId);
                res.json({peopleFound: true, myPeople: withoutMyId});
            })
            .catch(err =>{
                console.log('the error in findPeopleInDb: ', err);
            });
    } else {
        res.json({peopleFound: false});
    }
});

module.exports = { otherProfileRouter };