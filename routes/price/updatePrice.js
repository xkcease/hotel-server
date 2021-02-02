const express = require('express');
const router = express.Router();
const { validatePrice } = require('../../module/validator');
const { queryAllPrice, insertPrice, updatePrice } = require('../../api/price');
const Price = require('../../domain/Price');

router.post('/updatePrice', async (req, res) => {
    try {
        let priceArray = [];
        priceArray.push([0, req.body.kingRoomPrice]);
        priceArray.push([1, req.body.singleRoomPrice]);
        priceArray.push([2, req.body.doubleRoomPrice]);

        for (let array of priceArray) {
            if (!validatePrice(array[1])) {
                return res.json({ state: false, msg: '金额只能为数字' });
            }
        }

        let result = await queryAllPrice();
        if (result.length) {                    // 更新
            await Promise.all([updatePrice(priceArray[0].reverse()), updatePrice(priceArray[1].reverse()), updatePrice(priceArray[2].reverse())]);
        }
        else {                  // 插入
            await insertPrice(priceArray);
        }

        return res.json({ state: true, msg: '修改成功' });
    } catch (err) {
        console.log(err);
        return res.json({ state: false, msg: 'error' });
    }
});

module.exports = router;