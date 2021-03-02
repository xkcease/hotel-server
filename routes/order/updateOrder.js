const express = require('express');
const router = express.Router();
const { updateOrderByOid, updateOrderOwnTypeByOid } = require('../../api/order');

router.post('/updateOrder', (req, res) => {
    if (Reflect.has(req.body, 'type')) {
        updateOrderOwnTypeByOid(req.body.reservation_time, req.body.reservation_during, req.body.type, req.body.oid).then(() => {
            res.json({ state: true, msg: '修改成功' });
        }).catch(err => {
            console.log(err);
        });
    }
    else {
        updateOrderByOid(req.body.reservation_time, req.body.reservation_during, req.body.oid).then(() => {
            res.json({ state: true, msg: '修改成功' });
        }).catch(err => {
            console.log(err);
        });
    }

});

module.exports = router;