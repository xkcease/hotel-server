const express = require('express');
const router = express.Router();
const { validateRoomNumber } = require('../../module/validator');
const { queryRoomByNumber, updateRoomByNumber } = require('../../api/room');
const Room = require('../../domain/Room');

router.post('/updateRoom', (req, res) => {
    // 状态检测
    queryRoomByNumber(req.body.number).then((result) => {
        if (result.length > 0 && result[0].state) {
            return res.json({ state: false, msg: '该房间正在使用，暂不可更改' });
        }
    }).catch(err => {
        console.log(err);
    });

    // 重名检测
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

    const room = new Room(null, req.body.number, req.body.type, req.body.shower, req.body.tv, req.body.extra, '', 0);
    Reflect.deleteProperty(room, 'rid');
    Reflect.deleteProperty(room, 'img');
    Reflect.deleteProperty(room, 'state');

    updateRoomByNumber(room, room.number).then((a) => {
        res.json({ state: true, msg: '更改成功' });
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;