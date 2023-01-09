const express = require("express");
const { compare } = require("../encrypt");
const { selectAllDataFromUsersDB } = require('../db');

// const app = express();
// const { SESSION_SECRET } = process.env;
// const cookieSession = require("cookie-session");
// app.use(
//     cookieSession({
//         secret: SESSION_SECRET,
//         maxAge: 1000*60*60*24*14
//     })
// );

const loginRouter = express.Router();
loginRouter.post('/login', (req, res) => {
    console.log('Login route');
    let matchForUserIDs;
    const {email, password} = req.body;
    if(email !== '' && password !== ''){ //if not empty
        // res.json({validation: false}); 
        selectAllDataFromUsersDB()
            .then((allData) => {
                matchForUserIDs = allData.rows.find(el => {//match for email
                    return el.email === email;
                });
                if (matchForUserIDs){ //match for email === true
                    let pwdOfUser = matchForUserIDs.password;
                    // res.json({incorrectData: false});
                    compare(password, pwdOfUser)
                        .then((boolean)=>{//match for pwd
                            if(boolean === true){
                                req.session.userId = matchForUserIDs.id;//good
                                console.log('should log in. All passed');
                                res.json({incorrectData: false});
                            }else{
                                res.json({incorrectData: true});
                            }
                        })
                        .catch(err => {
                            console.log('error with pwd?: ', err);
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
module.exports = { loginRouter};