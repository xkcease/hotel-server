const express = require('express');
const router = express.Router();
const { createOid } = require('../../module/utils');
const { insertSomeOrders } = require('../../api/order');
const { queryUserByUid } = require('../../api/user');
const Order = require('../../domain/Order');
const cache = require('../../module/cache');

module.exports = function (io) {
    router.post('/reserve', async (req, res) => {
        let obj = req.body;

        let values = [];
        let orderArray = [];
        let user = cache.get(req.body.sessionId);
        console.log(user);

        try {
            let userResult = await queryUserByUid(user.uid);
            console.log(userResult);
            console.log(userResult[0].phone);
            for (let i = 0; i < obj.number; i++) {
                let order = new Order(createOid(), null, user.uid, Date.now(), obj.reservation_time, obj.reservation_during,
                    null, null, 0, obj.type, userResult[0].phone);
                console.log(order);
                values.push([...order]);
                orderArray.push(order);
            }

            let result = await insertSomeOrders(values);
            if (result.affectedRows) {
                res.json({ state: true, msg: '预订成功' });
                io.emit('new-order', { orderArray });
            }
            else {
                res.json({ state: false, msg: 'error' });
            }

        } catch (err) {
            console.log(err);
        }
    });

    return router;
}
