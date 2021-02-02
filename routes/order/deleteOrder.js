const express = require('express');
const router = express.Router();
const { deleteOrder } = require('../../api/order');

router.post('/deleteOrder', (req, res) => {
    deleteOrder(req.body.oid).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, msg: '删除成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;