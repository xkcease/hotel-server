const express = require('express');
const router = express.Router();
const { queryAllRooms } = require('../../api/room');

router.get('/getRooms', (req, res) => {
    queryAllRooms().then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;