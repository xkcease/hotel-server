const express = require('express');
const router = express.Router();
const { validateRoomNumber } = require('../../module/validator');
const { queryRoomByNumber, insertRoom } = require('../../api/room');
const Room = require('../../domain/Room');

router.post('/addRoom', (req, res) => {
    queryRoomByNumber(req.body.number).then((result) => {
        if (result.length <= 0) {
            if (!validateRoomNumber(req.body.number)) {
                return res.json({ state: false, msg: '房间号为长度3-8的数字或字母' });
            }

            const room = new Room(null, req.body.number, req.body.type, req.body.shower, req.body.tv, req.body.extra, '', 0);
            insertRoom(room).then(() => {
                res.json({ state: true, msg: '添加成功' });
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            res.json({ state: false, msg: '该房间号已存在' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;