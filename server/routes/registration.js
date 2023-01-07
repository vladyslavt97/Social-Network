const express = require("express");
const { hashPass } = require("../encrypt");
const { insertDataIntoUsersDB } = require('../db');

const registerRouter = express.Router();

registerRouter.post('/registration', (req, res) => {
    const {firstname, lastname, email, password} = req.body;
    // console.log('check!!!:', req.body);
    hashPass(password).then((hashedPassword) => {
        if(firstname !== '' && lastname !== '' && email !== '' && password !== ''){
            insertDataIntoUsersDB(firstname, lastname, email, hashedPassword)
                .then((data)=>{
                    // req.session.signedIn = data.rows[0].id;
                    res.json({ success: true, myUser: data.rows[0], validation: true });
                    
                })
                .catch((err) => {
                    console.log('render error', err);
                    res.json({ success: false });
                });
        } else {
            res.json({validation: false});
        }
    });
});

module.exports = { registerRouter };