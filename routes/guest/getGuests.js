const express = require('express');
const router = express.Router();
const { queryGuestsByOid } = require('../../api/guest');

router.get('/getGuests', (req, res) => {
    let oid = req.query.oid;

    queryGuestsByOid(oid).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;