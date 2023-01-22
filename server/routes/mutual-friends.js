const express = require("express");
const { allMyFriendsInDB, allHisFriendsInDB } = require('../db');

const mutualFriendsRouter = express.Router();
mutualFriendsRouter.get('/mutual/friends/:id', async (req, res) => {
    let myId = req.session.userId;
    let idParams = req.params.id;
    try{
        let myFriendsData = await allMyFriendsInDB(myId);
        let theirFriendsData = await allHisFriendsInDB(idParams);
        const matches = myFriendsData.rows.filter(mfId => {
            return theirFriendsData.rows.find(theirFId => theirFId.sender_id === mfId.sender_id
                || theirFId.recipient_id === mfId.recipient_id
                || theirFId.sender_id === mfId.recipient_id
                || theirFId.recipient_id === mfId.sender_id
            );
        });
        let mutualFriends = matches.filter(el=>el.id !== req.session.userId);
        res.json({result: mutualFriends});
    }
    catch (error){
        console.log(error);
    }
});

module.exports = { mutualFriendsRouter };