const express = require('express');
const router = express.Router();
const { checkOutApi } = require('../../api/order');

router.post('/checkOut', (req, res) => {
    let obj = { check_out_time: Date.now(), state: 2 };

    checkOutApi(obj, req.body.oid).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, msg: '办理成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;