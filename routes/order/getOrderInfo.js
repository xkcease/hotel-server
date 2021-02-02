const express = require('express');
const router = express.Router();
const { queryOrderByOid, queryReservedByUid } = require('../../api/order');

router.post('/getOrderInfo', (req, res) => {
    if (req.body.oid) {
        queryOrderByOid(req.body.oid).then(result => {
            if (result.length) {
                res.json({ state: true, order: result[0] });
            }
            else {
                res.json({ state: false, msg: '无此订单' });
            }
        }).catch(err => {
            console.log(err);
        });
    }
    else if (req.body.uid) {
        queryReservedByUid(req.body.uid).then(result => {
            if (result.length) {
                res.json({ state: true, order: result[0] });
            }
            else {
                res.json({ state: false, msg: '无此订单' });
            }
        }).catch(err => {
            console.log(err);
        });
    }

});

module.exports = router;