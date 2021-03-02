const express = require('express');
const router = express.Router();
const { createOid } = require('../../module/utils');
const { insertSomeOrders } = require('../../api/order');
const { queryUserByUid } = require('../../api/user');
const Order = require('../../domain/Order');
const cache = require('../../module/cache');

router.post('/reserve', async (req, res) => {
    let obj = req.body;

    let values = [];
    let user = cache.get(req.body.sessionId);

    try {
        let userResult = await queryUserByUid(user.uid);
        for (let i = 0; i < obj.number; i++) {
            let order = new Order(createOid(), null, user.uid, Date.now(), obj.reservation_time, obj.reservation_during,
                null, null, 0, obj.type, userResult.phone);
            values.push([...order]);
        }

        let result = await insertSomeOrders(values);
        if (result.affectedRows) {
            res.json({ state: true, msg: '预订成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }

    } catch (err) {
        console.log(err);
    }
});

module.exports = router;