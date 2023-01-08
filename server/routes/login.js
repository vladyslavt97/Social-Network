const express = require("express");
const { compare } = require("../encrypt");
const { selectAllDataFromUsersDB } = require('../db');

const app = express();
const { SESSION_SECRET } = process.env;
const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: SESSION_SECRET,
        maxAge: 1000*60*60*24*14
    })
);

const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
    let matchForUserIDs;
    const {email, password} = req.body;
    if(email !== '' && password !== ''){ //if not empty
        res.json({validation: false}); 
        selectAllDataFromUsersDB()
            .then((allData) => {
                matchForUserIDs = allData.rows.find(el => { //match for email
                    return el.email === email;
                });
                if (matchForUserIDs){
                    let pwdOfUser = matchForUserIDs.password;
                    // res.json({incorrectData: false});
                    console.log('session: ', req.session);
                    console.log('matchForUserIDs: ', matchForUserIDs);
                    compare(password, pwdOfUser)//match for pwd
                        .then((boolean)=>{
                            if(boolean === true){
                                req.session.userId = matchForUserIDs.id;
                                res.json({incorrectData: false});
                            }else{
                                res.json({incorrectData: true});
                            }
                        });
                }else {
                    console.log('match for email but not pwd');
                    res.json({incorrectData: true});
                }
            });
    } else {
        console.log('did not pass the validation. Show validation');
        res.json({validation: true}); 
    }
});

module.exports = { loginRouter };