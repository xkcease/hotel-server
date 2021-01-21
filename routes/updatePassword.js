const express = require('express');
const router = express.Router();
const { updateUserPassword, queryUserByUsername } = require('../api/user');
const { encryptPasswordSync } = require('../module/encrypt');

router.post('/updatePassword', (req, res) => {
    queryUserByUsername(req.body.username).then(result => {
        if (result.length && result[0].idkey === req.body.idkey) {
            updateUserPassword(encryptPasswordSync(req.body.password), req.body.username).then(() => {
                res.json({ state: true, msg: '修改成功' });
            }).catch(err => {
                console.log(err);
            });
        }
        else {
            res.json({ state: false, msg: '密保错误' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;