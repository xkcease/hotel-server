const express = require('express');
const router = express.Router();
const { queryHotelIntro } = require('../../api/intro');

router.get('/getHotelIntro', (req, res) => {
    queryHotelIntro().then(result => {
        if (result.length) {
            res.json({ state: true, hotelIntro: result[0] });
        }
        else {
            res.json({ state: false, msg: '无信息' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;