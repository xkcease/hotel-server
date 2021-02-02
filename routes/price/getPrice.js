const express = require('express');
const router = express.Router();
const { queryAllPrice, queryPriceByType } = require('../../api/price');

router.get('/getPrice', (req, res) => {
    if (req.query.type) {
        queryPriceByType(req.query.type).then(result => {
            res.json(result[0]);
        }).catch(err => {
            console.log(err);
        });
    }
    else {
        queryAllPrice().then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }

});

module.exports = router;