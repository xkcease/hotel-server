const express = require('express');
const router = express.Router();
const { insertHotelIntro, queryHotelIntro, updateHotelIntro } = require('../../api/intro');
const HotelIntro = require('../../domain/HotelIntro');

router.post('/updateHotelIntro', async (req, res) => {
    try {
        const hotelIntro = new HotelIntro(1, req.body.name, req.body.intro, req.body.options, req.body.address, req.body.contact, '');

        let result = await queryHotelIntro();
        if (result.length) {                    // 更新
            Reflect.deleteProperty(hotelIntro, 'id');
            Reflect.deleteProperty(hotelIntro, 'img');

            await updateHotelIntro(hotelIntro, 1);
        }
        else {      // 插入
            await insertHotelIntro(hotelIntro);
        }

        return res.json({ state: true, msg: '成功' });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;