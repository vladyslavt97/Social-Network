require('dotenv').config();
const {DATABASE_URL} = process.env;
const spicedPg = require('spiced-pg');
const db = spicedPg(DATABASE_URL);

//with email
module.exports.selectAllDataFromUsersDBBasedOnEmail = (email) =>{
    return db.query(`SELECT * FROM users
    WHERE email = $1;`, [email]);
};

module.exports.selectAllDataFromUsersDB = () =>{
    return db.query(`SELECT * FROM users;`);
};
//id
module.exports.selectAllDataFromUsersDBBasedOnId = (id) =>{
    return db.query(`SELECT * FROM users
    Where id = $1;`, [id]);
};
//newpeople sort 3 by newest id
module.exports.selectThreeNewestUsersFromDB = () =>{
    return db.query(`SELECT * 
    FROM users 
    ORDER BY id DESC
    LIMIT 3;`);
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

//image update
module.exports.updateUsersPPUrl = (profile_pic_url, id) =>{
    return db.query(`UPDATE users
    SET profile_pic_url = $1 
    WHERE id = $2 RETURNING *;`, [profile_pic_url, id]);
};

//bio update
module.exports.updateUsersBio = (bio, id) =>{
    return db.query(`UPDATE users
    SET bio = $1 
    WHERE id = $2 RETURNING *;`, [bio, id]);
};

//find friends
module.exports.findFriendsInDB = (peopleName) =>{
    return db.query(`SELECT * 
        FROM users 
        WHERE first ILIKE $1;`,[peopleName + '%']);
};

//find friends
module.exports.otherProfileInDB = (id) =>{
    return db.query(`SELECT * 
        FROM users 
        WHERE id = $1;`,[id]);
};


//get all user info + pp "time wasted:("
// module.exports.selectUserAndProfilePic = (id) => {
//     return db.query(`SELECT users.first,users.last,users.email,users.password,users.id,profile_pics.profile_pic_url, profile_pics.user_id
//         FROM users 
//         LEFT JOIN profile_pics 
//         ON users.id = profile_pics.user_id 
//         WHERE users.id = $1;`, [id]);
// };

// friend requests //SELECT
module.exports.checkFriendReqInDB = (me, anotherUser) =>{//we acpect only one row
    return db.query(`
    SELECT * 
    FROM friend_requests 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1);`,[me, anotherUser]);
};

//friend requests //INSERT
module.exports.insertIntoReset_CodesDB = (sender_id, recipient_id) => {
    return db.query(`
    INSERT INTO friend_requests (sender_id, recipient_id) 
    VALUES ($1, $2) 
    RETURNING *;`, [sender_id, recipient_id]);
};

// friend requests //DELETE
module.exports.deleteFromFriend_RequestsDB = (me, anotherUser) => {
    return db.query(`
    DELETE FROM friend_requests 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1)
    RETURNING *;`,[me, anotherUser]);
};

// friend requests //UPDATE
module.exports.updateReset_CodesDB = (me, anotherUser, status) =>{
    return db.query(`
    UPDATE friend_requests
    SET accepted = $3 
    WHERE (sender_id = $1 AND recipient_id = $2)
    OR (sender_id = $2 AND recipient_id = $1)
    RETURNING *;`,[me, anotherUser, status]);
};


//get request for notifications! "to be accepted"
//check if there are requests for me and they are false
module.exports.notificationsForMeInDB = (myId, status) =>{//we acpect only one row
    return db.query(`
    SELECT * 
    FROM friend_requests
    JOIN users
    ON users.id = friend_requests.sender_id 
    WHERE recipient_id = $1 AND accepted = $2;`,[myId, status]);
};

//friends
module.exports.myFriendsInDB = (myId) =>{//we acpect only one row
    return db.query(`
    SELECT friend_requests.id AS fid, * 
    FROM friend_requests
    JOIN users
    ON users.id = friend_requests.sender_id 
    WHERE recipient_id = $1;`,[myId]);
};
// module.exports.myFriendsInDB = (myId, status) =>{//we acpect only one row
//     return db.query(`
//     SELECT * 
//     FROM friend_requests
//     JOIN users
//     ON users.id = friend_requests.sender_id 
//     WHERE recipient_id = $1 AND accepted = $2;`,[myId, status]);
// };

//delete my account
module.exports.deleteUserAndFriendshipsDB = (myId) => {
    return db.query(`
    DELETE FROM friend_requests
    WHERE recipient_id = $1;`,[myId])
        .then(()=> {
            db.query(`
            DELETE FROM users
            WHERE id = $1;`,[myId]);
        })
        .catch(()=>{
            console.log('error:(((');
        });
};



// ------------------------------MESSAGES ! ! !---------------------------- //
// insert a new message
// - sender_id
// - message (text)
module.exports.insertMessage = (userId, text) => {
    return db.query(`
    INSERT INTO messages (sender_id, message) 
    VALUES ($1, $2) 
    RETURNING *;`, [userId, text]);
};

module.exports.getLatestMessages = (limit = 10) => {
    const sql = `
        SELECT * FROM (
            SELECT m.id, m.message, m.created_at,
                u.first, u.last, u.profile_pic_url
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            ORDER BY m.created_at DESC
            limit $1
        ) as results ORDER BY created_at ASC
    `;

    return db.query(sql, [limit]);
};