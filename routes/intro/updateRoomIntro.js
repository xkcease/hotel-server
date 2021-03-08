const express = require('express');
const router = express.Router();
const { insertRoomIntro, queryRoomIntroByType, updateRoomIntroByType } = require('../../api/intro');
const RoomIntro = require('../../domain/RoomIntro');

router.post('/updateRoomIntro', async (req, res) => {
    try {
        const roomIntro = new RoomIntro(req.body.type, req.body.text, req.body.shower, req.body.tv, req.body.window, req.body.options, '', req.body.intro);

        let result = await queryRoomIntroByType(req.body.type);
        if (result.length) {                    // 更新
            Reflect.deleteProperty(roomIntro, 'type');
            Reflect.deleteProperty(roomIntro, 'img');

            await updateRoomIntroByType(roomIntro, req.body.type);
        }
        else {      // 插入
            await insertRoomIntro(roomIntro);
        }

        return res.json({ state: true, msg: '成功' });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;