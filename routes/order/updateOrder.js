const express = require('express');
const router = express.Router();
const { updateOrderByOid } = require('../../api/order');

router.post('/updateOrder', (req, res) => {
    updateOrderByOid(req.body.reservation_time, req.body.reservation_during, req.body.oid).then(() => {
        res.json({ state: true, msg: '修改成功' });
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;