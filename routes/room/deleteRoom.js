const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { queryRoomByNumber, deleteRoomByNumber } = require('../../api/room');

router.post('/deleteRoom', async (req, res) => {
    try {
        let result = await queryRoomByNumber(req.body.number);

        if (result.length && result[0].state === 1) {
            return res.json({ state: false, msg: '此房间已被预订，暂不可删除' });
        }

        let deleteResult = await deleteRoomByNumber(req.body.number)
        if (deleteResult.affectedRows) {
            let dirPath = path.join(__dirname, '../../static/img');
            let name = req.body.number + path.extname(req.body.img);
            try {
                fs.unlinkSync(dirPath + '\\' + name);
            } catch {
                console.log('image not exists');
            }

            return res.json({ state: true, msg: '删除成功' });
        }
        else {
            return res.json({ state: false, msg: 'error' });
        }
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;