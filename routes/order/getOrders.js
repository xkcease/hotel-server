const express = require('express');
const router = express.Router();
const { queryAllOrders } = require('../../api/order');

router.post('/getOrders', (req, res) => {
    queryAllOrders().then(result => {
        let list = result.filter(order => {
            return order.state === req.body.state;
        });

        res.json(list);
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;