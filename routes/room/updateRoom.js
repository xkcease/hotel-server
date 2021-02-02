const express = require('express');
const router = express.Router();
const { validateRoomNumber } = require('../../module/validator');
const { queryRoomByNumber, updateRoomByNumber } = require('../../api/room');
const Room = require('../../domain/Room');

router.post('/updateRoom', async (req, res) => {
    try {
        // 状态检测
        let result = await queryRoomByNumber(req.body.number);
        if (result.length > 0 && result[0].state) {
            return res.json({ state: false, msg: '该房间正在使用，暂不可更改' });
        }


        // 重名检测
        if (req.body.oldNumber !== req.body.number) {
            let result = await queryRoomByNumber(req.body.number);
            if (result.length > 0) {
                return res.json({ state: false, msg: '该房间号已存在' });
            }

        }

        if (!validateRoomNumber(req.body.number)) {
            return res.json({ state: false, msg: '房间号为长度3-8的数字或字母' });
        }

        const room = new Room(null, req.body.number, req.body.type, req.body.shower, req.body.tv, req.body.extra, '', 0);
        Reflect.deleteProperty(room, 'rid');
        Reflect.deleteProperty(room, 'img');
        Reflect.deleteProperty(room, 'state');

        await updateRoomByNumber(room, room.number);
        return res.json({ state: true, msg: '更改成功' });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;