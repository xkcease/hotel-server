const express = require('express');
const router = express.Router();
const { queryRoomByNumber } = require('../../api/room');

router.get('/getRoomInfo', (req, res) => {
    queryRoomByNumber(req.query.number).then(result => {
        if (result.length) {
            res.json({ state: true, room: result[0] });
        }
        else {
            res.json({ state: false, msg: '无此房间' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;