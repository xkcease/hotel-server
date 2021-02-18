const express = require('express');
const router = express.Router();
const { queryAllRoomIntros } = require('../../api/intro');

router.get('/getAllRoomIntros', (req, res) => {
    queryAllRoomIntros().then(result => {
        if (result.length) {
            res.json({ state: true, roomIntro: result });
        }
        else {
            res.json({ state: false, msg: '无信息' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;