const express = require('express');
const router = express.Router();
const { validateRoomNumber } = require('../../module/validator');
const { queryRoomByNumber, updateRoomByNumber } = require('../../api/room');
const Room = require('../../domain/Room');

router.post('/updateRoom', (req, res) => {
    if (req.body.oldNumber !== req.body.number) {
        queryRoomByNumber(req.body.number).then((result) => {
            if (result.length > 0) {
                return res.json({ state: false, msg: '该房间号已存在' });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    if (!validateRoomNumber(req.body.number)) {
        return res.json({ state: false, msg: '房间号为长度3-8的数字或字母' });
    }

    const room = new Room(null, req.body.number, req.body.type, req.body.shower, req.body.tv, req.body.extra, '');
    Reflect.deleteProperty(room, 'id');
    Reflect.deleteProperty(room, 'img');

    updateRoomByNumber(room, room.number).then(() => {
        res.json({ state: true, msg: '更改成功' });
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;