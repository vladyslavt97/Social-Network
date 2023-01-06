require('dotenv').config();
const {DATABASE_URL} = process.env;
const spicedPg = require('spiced-pg');
const db = spicedPg(DATABASE_URL);

module.exports.selectAllDataFromUsersDB = (email) =>{
    return db.query(`SELECT * FROM users
    WHERE email = $1;`, [email]);
};
//with email
module.exports.selectAllDataFromUsersDBBasedOnEmail = () =>{
    return db.query(`SELECT * FROM users;`);
};


module.exports.insertDataIntoUsersDB = (firstname, lastname, email, hashedPassword) => {
    return db.query(`INSERT INTO users (first, last, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING *;`, [firstname, lastname, email, hashedPassword]);
};

//reset_codes
module.exports.selectAllDataFromReset_CodesDB = () =>{
    return db.query(`SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`);
};
//SELECT * FROM my_table
// WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';

module.exports.insertIntoReset_CodesDB = (email, code) => {
    return db.query(`INSERT INTO reset_codes (email, code) 
    VALUES ($1, $2) RETURNING *;`, [email, code]);
};


//update the pwd
module.exports.updateUsersDB = (password) => {
    return db.query(`UPDATE users
                    SET password = $1:`, [password]);
};