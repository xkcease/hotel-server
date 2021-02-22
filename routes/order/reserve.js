const express = require('express');
const router = express.Router();
const { createOid } = require('../../module/utils');
const { insertOrder } = require('../../api/order');
const Order = require('../../domain/Order');
const cache = require('../../module/cache');

router.post('/reserve', (req, res) => {
    let obj = req.body;

    let user = cache.get(req.body.sessionId);
    let order = new Order(createOid(), null, user.uid, Date.now(), obj.reservation_time, obj.reservation_during,
        null, null, 0, obj.type);

    insertOrder(order).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, msg: '预订成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;