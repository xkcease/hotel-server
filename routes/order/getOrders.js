const express = require('express');
const router = express.Router();
const { queryAllOrders, queryAllOrdersOwnRoom } = require('../../api/order');

router.post('/getOrders', (req, res) => {
    if (req.body.state === 0) {
        queryAllOrders(req.body.state).then(result => {
            res.json(result);
        })
    }
    else {
        queryAllOrdersOwnRoom(req.body.state).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }

});

module.exports = router;