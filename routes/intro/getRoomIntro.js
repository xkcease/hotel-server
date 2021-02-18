const express = require('express');
const router = express.Router();
const { queryRoomIntroByType } = require('../../api/intro');

router.get('/getRoomIntro', (req, res) => {
    queryRoomIntroByType(req.query.type).then(result => {
        if (result.length) {
            res.json({ state: true, roomIntro: result[0] });
        }
        else {
            res.json({ state: false, msg: '无信息' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;