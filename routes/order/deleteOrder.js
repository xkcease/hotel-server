const express = require('express');
const router = express.Router();
const { deleteOrder } = require('../../api/order');
const { updateRoomStateByRid } = require('../../api/room');

router.post('/deleteOrder', (req, res) => {
    deleteOrder(req.body.oid).then(result => {
        if (result.affectedRows) {
            if (req.body.rid) {
                updateRoomStateByRid(0, req.body.rid).then(() => {
                    res.json({ state: true, msg: '删除成功' });
                }).catch(err => {
                    console.log(err);
                });
            }

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