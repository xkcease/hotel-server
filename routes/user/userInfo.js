const express = require('express');
const router = express.Router();
const { queryUserByUsername } = require('../api/user');

router.post('/userInfo', (req, res) => {
    const token = req.get('Authorization');

    queryUserByUsername(req.body.username).then(result => {
        if (result.length) {
            return res.json({ state: true, username: result[0].username, permission: result[0].permission });
        }
        else {
            return res.json({ state: false, msg: '无此用户' });
        }
    });

});

module.exports = router;