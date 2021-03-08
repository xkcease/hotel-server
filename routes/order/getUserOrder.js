const express = require('express');
const router = express.Router();
const { queryOrderByUidAndOid } = require('../../api/order');
const cache = require('../../module/cache');

router.get('/getUserOrder', (req, res) => {
    let user = cache.get(req.query.sessionId)
    let oid = req.query.oid;

    queryOrderByUidAndOid(user.uid, oid).then(result => {
        res.json(result[0]);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;