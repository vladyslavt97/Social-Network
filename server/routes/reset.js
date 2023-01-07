const express = require("express");
const { hashPass } = require("../encrypt");
const { selectAllDataFromUsersDBBasedOnEmail,
    selectAllDataFromReset_CodesDB,
    insertIntoReset_CodesDB,
    updateUsersDB } = require('../db');

const resetRouter = express.Router();
const { sendingEmail } = require('../ses');
// sendingEmail();i

const cryptoRandomString = require('crypto-random-string');
const secretCode = cryptoRandomString({
    length: 6
});
console.log('super secret code! Do NOT SHOW TO ANYONE!', secretCode);


resetRouter.post('/emailcheck', (req, res) => {//check the email
    let code = secretCode;
    let matchForUserEmails;
    const {email} = req.body;
    if(email !== ''){
        selectAllDataFromUsersDBBasedOnEmail(email)
            .then((data)=>{
                matchForUserEmails = data.rows.find(el => { //match for email
                    return el.email === email;
                });
                if (matchForUserEmails){
                // req.session.signedIn = data.rows[0].id;
                    console.log(('email we get from the users: ', data.rows));
                    res.json({ success: true, emailCheck: data.rows, validation: true });
                    insertIntoReset_CodesDB(email, code)//insert email, code
                        // .then(() => {
                        //     console.log('email and code should get inserted and user will be redirected to the page where email and pwd will be checked');
                        //     res.json({ emailSent: true });
                        //     return sendingEmail();
                        // }) //disabled die to AWS issue
                        .then(()=>{
                            console.log('email should be sent and code inserted. Check DB');
                        })
                        .catch((err) => {
                            console.log('email was not sent:(', err);
                            res.json({ emailSent: false });
                        });
                }else{
                    res.json({incorrectData: false});
                    console.log('email did not match');
                }
            })
            .catch((err) => {
                console.log('selection from reset_codes based on email did not work', err);
                res.json({ success: false });
            });
    } else {
        res.json({validation: false});
    }
});

//route 2
resetRouter.post('/verify', (req, res) => {//check for the match of email and pwd with the reset_codes
    // let matchForEmails;
    let matchForCodes;
    const {email,password, code} = req.body;
    console.log('req@', req.body);
    if(password !== '' && code !== ''){
        selectAllDataFromReset_CodesDB()
            .then((data)=>{
                matchForCodes = data.rows.find(el => { //match for code
                    return el.code === code;
                });
                console.log('matchForCodes: ', matchForCodes);
                if (matchForCodes){//now compare the pwd
                    hashPass(password)// hash the pwd
                        .then((hashedPassword)=>{
                            console.log('got hashed in the reset route');
                            updateUsersDB(hashedPassword, email)//and the id to match with users (2)
                                .then((data)=>{
                                    console.log('updated the pwd in users: ', data);
                                    console.log('Congrats! you can copy & paste:)');
                                    res.json({ success: true });
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