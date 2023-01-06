const express = require("express");
const { compare } = require("../encrypt");
const { selectAllDataFromUsersDB } = require('../db');

const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
    let matchForUserIDs;
    const {email, password} = req.body;
    if(email !== '' && password !== ''){ //if not empty
        res.json({validation: true}); 
        selectAllDataFromUsersDB()
            .then((allData) => {
                matchForUserIDs = allData.rows.find(el => { //match for email
                    return el.email === email;
                });
                if (matchForUserIDs){
                    let pwdOfUser = matchForUserIDs.password;
                    compare(password, pwdOfUser)//match for pwd
                        .then((boolean)=>{
                            if(boolean === true){
                                req.session.signedIn = matchForUserIDs.id;
                                res.json({incorrectData: false});
                            }else{
                                res.json({incorrectData: true});
                            }
                        });
                }else {
                    res.json({incorrectData: false});

                }
            });
    } else {
        res.json({validation: false}); 
    }
});

module.exports = { loginRouter };