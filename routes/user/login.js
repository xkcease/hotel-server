const express = require('express');
const router = express.Router();
const { queryUserByUsername } = require('../../api/user');
const { getToken } = require('../../module/jwt');
const { encryptPasswordSync } = require('../../module/encrypt');


router.post('/login', (req, res) => {
    queryUserByUsername(req.body.username).then(result => {
        if (result.length && encryptPasswordSync(req.body.password) === result[0].password) {
            const token = getToken({ username: result[0].username, permission: result[0].permission });
            res.json({ state: true, token });
        }
        else {
            res.json({ state: false, msg: '用户名或密码错误' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;