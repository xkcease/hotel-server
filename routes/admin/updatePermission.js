const express = require('express');
const router = express.Router();
const { updatePermission } = require('../../api/admin');

router.post('/updatePermission', (req, res) => {
    updatePermission(req.body.username, req.body.permission).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, msg: '修改成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;