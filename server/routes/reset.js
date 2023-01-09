const express = require("express");
const { hashPass } = require("../encrypt");
const { selectAllDataFromUsersDBBasedOnEmail,
    selectAllDataFromReset_CodesDB,
    insertIntoReset_CodesDB,
    updatePasswordInUsersTable,
    deleteFromReset_CodesDB } = require('../db');

const { SESSION_SECRET } = process.env;
const cookieSession = require("cookie-session");
const app = express();
app.use(
    cookieSession({
        secret: SESSION_SECRET,
        maxAge: 1000*60*60*24*14
    })
);

const resetRouter = express.Router();
// const { sendingEmail } = require('../ses');
// sendingEmail();

const cryptoRandomString = require('crypto-random-string');
const secretCode = cryptoRandomString({
    length: 6
});

resetRouter.post('/emailcheck', (req, res) => {//check the email
    let code = secretCode;
    let matchForUserEmails;
    const {email} = req.body;
    if(email !== ''){
        // res.json({ validation: false });
        selectAllDataFromUsersDBBasedOnEmail(email)
            .then((data)=>{
                matchForUserEmails = data.rows.find(el => { //match for email
                    return el.email === email;
                });
                if (matchForUserEmails){
                    console.log(('email we get from the users: ', data.rows));
                    // res.json({ validation: false });
                    insertIntoReset_CodesDB(email, code)//insert email, code
                        // .then(() => {
                        // console.log('email should be sent now..');
                        //     return sendingEmail();
                        // }) //disabled die to AWS issue
                        .then(()=>{
                            console.log('email should be sent and code inserted. Check DB');
                            res.json({incorrectData: false});
                        })
                        .catch((err) => {
                            console.log('email was not sent:(', err);
                        });
                }else{
                    res.json({incorrectData: true});
                    console.log('email did not match');
                }
            })
            .catch((err) => {
                console.log('selection from reset_codes based on email did not work', err);
                res.json({ success: false });
            });
    } else {
        res.json({validation: true});
    }
});

//route 2
resetRouter.post('/verify', (req, res) => {//check for the match of email and pwd with the reset_codes
    // let matchForEmails;
    let matchForCodes;
    const {password, code} = req.body;
    console.log('req@', req.body);
    if(password !== '' && code !== ''){
        selectAllDataFromReset_CodesDB()
            .then((data)=>{
                matchForCodes = data.rows.find(el => { //match for code
                    return el.code === code;
                });
                if (matchForCodes){
                    hashPass(password)
                        .then((hashedPassword)=>{
                            console.log('got hashed in the reset route');
                            let emailR = matchForCodes.email;
                            updatePasswordInUsersTable(hashedPassword, emailR)
                                .then((data)=>{
                                    console.log('updated the pwd in users: ', data.rows);
                                    res.json({ success: true });
                                    return deleteFromReset_CodesDB(emailR);
                                })
                                .then(()=>{
                                    console.log('got deleted from reset_codes. Go and check!');
                                })  
                                .catch((err) => {
                                    console.log('could not be update', err);
                                    res.json({ success: false });
                                });
                        })
                        .catch(() => {
                            console.log('hashing the pwd has failed..');
                        });
                }else{
                    console.log('the code did not match...');
                    res.json({ success: false });
                }
            })
            .catch((err) => {
                console.log('could not selectAllDataFromReset_CodesDB..', err);
                res.json({ success: false });
            });
    } else {
        console.log('Please, give something!');
        res.json({validation: false});
    }
});

module.exports = { resetRouter };