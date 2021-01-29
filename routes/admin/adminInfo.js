const express = require('express');
const router = express.Router();
const { queryAdminByUsername } = require('../../api/admin');

router.post('/adminInfo', (req, res) => {
    const token = req.get('Authorization');

    queryAdminByUsername(req.body.username).then(result => {
        if (result.length) {
            return res.json({ state: true, username: result[0].username, permission: result[0].permission });
        }
        else {
            return res.json({ state: false, msg: '无此用户' });
        }
    });

});

module.exports = router;