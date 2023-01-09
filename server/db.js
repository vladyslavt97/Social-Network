require('dotenv').config();
const {DATABASE_URL} = process.env;
const spicedPg = require('spiced-pg');
const db = spicedPg(DATABASE_URL);

module.exports.selectAllDataFromUsersDBBasedOnEmail = (email) =>{//selectAllDataFromUsersDBBasedOnEmail
    return db.query(`SELECT * FROM users
    WHERE email = $1;`, [email]);
};
//with email
module.exports.selectAllDataFromUsersDB = () =>{
    return db.query(`SELECT * FROM users;`);
};


module.exports.insertDataIntoUsersDB = (firstname, lastname, email, hashedPassword) => {
    return db.query(`INSERT INTO users (first, last, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING *;`, [firstname, lastname, email, hashedPassword]);
};

//reset_codes
module.exports.selectAllDataFromReset_CodesDB = () =>{
    return db.query(`SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes';`);
};

module.exports.insertIntoReset_CodesDB = (email, code) => {
    return db.query(`INSERT INTO reset_codes (email, code) 
    VALUES ($1, $2) RETURNING *;`, [email, code]);
};


//update the pwd
module.exports.updatePasswordInUsersTable = (hashedPassword, emailR) => {
    return db.query(`UPDATE users 
                    SET password = $1
                    WHERE email = $2;`, [hashedPassword, emailR]);
};

//delet from reset_codes on button click
module.exports.deleteFromReset_CodesDB = (emailR) => {
    return db.query(`
                DELETE FROM reset_codes 
                WHERE email = $1;`, [emailR]);
};


//image insertion
// module.exports.insertIntoProfilePics = (user_id, profile_pic_url) =>{
//     return db.query(`INSERT INTO profile_pics (user_id, profile_pic_url) 
//     VALUES ($1, $2) RETURNING *;`, [user_id, profile_pic_url]);
// };

//get all user info + pp
// module.exports.selectUserAndProfilePic = (id) => {
//     return db.query(`SELECT * FROM users 
//                     FULL OUTER JOIN profile_pics 
//                     ON users.id = profile_pics.user_id WHERE user_id = $1;`, [id]);
// };