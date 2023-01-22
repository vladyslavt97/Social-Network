const express = require("express");
const { allMyFriendsInDB, allHisFriendsInDB } = require('../db');

const mutualFriendsRouter = express.Router();
mutualFriendsRouter.get('/mutual/friends/:id', async (req, res) => {
    let myId = req.session.userId;
    // console.log('myId', myId);

    let idParams = req.params.id;
    // console.log('idParams', idParams);
    try{
        let myFriendsData = await allMyFriendsInDB(myId);
        // console.log('myFriendsData: ', myFriendsData.rows);

        let theirFriendsData = await allHisFriendsInDB(idParams);
        // console.log('theirFriendsData: ', theirFriendsData.rows);
        const matches = myFriendsData.rows.filter(mfId => {
            return theirFriendsData.rows.find(theirFId => theirFId.sender_id === mfId.sender_id
                || theirFId.recipient_id === mfId.recipient_id
                || theirFId.sender_id === mfId.recipient_id
                || theirFId.recipient_id === mfId.sender_id
            );
        });
         
        // console.log('matches', matches, );//with me for some reason???

        let mutualFriends = matches.filter(el=>el.id !== req.session.userId);
        console.log('mutualFriends', mutualFriends );//with me for some reason???
        res.json({result: mutualFriends});
    }
    catch (error){
        console.log(error);
    }
});

module.exports = { mutualFriendsRouter };