const express = require('express');
const router = express.Router();
const { deleteRoomByNumber } = require('../../api/room');

router.post('/deleteRoom', (req, res) => {
    deleteRoomByNumber(req.body.number).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, msg: '删除成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;