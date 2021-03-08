const express = require('express');
const router = express.Router();
const { queryOrderByUidAndState, queryOrderByUid } = require('../../api/order');
const cache = require('../../module/cache');

router.get('/getUserOrders', (req, res) => {
    let user = cache.get(req.query.sessionId)
    let state = parseInt(req.query.state);

    if (state !== 3) {
        queryOrderByUidAndState(user.uid, state).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }
    else {
        queryOrderByUid(user.uid).then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }
});

module.exports = router;