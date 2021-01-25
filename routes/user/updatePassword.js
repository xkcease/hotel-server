const express = require('express');
const router = express.Router();
const { updateUserPassword, queryUserByUsername } = require('../../api/user');
const { encryptPasswordSync } = require('../../module/encrypt');
const { validatePassword } = require('../../module/validator');

router.post('/updatePassword', (req, res) => {
    queryUserByUsername(req.body.username).then(result => {
        if (result.length && result[0].idkey === req.body.idkey) {
            if (validatePassword(req.body.password)) {
                updateUserPassword(encryptPasswordSync(req.body.password), req.body.username).then(() => {
                    res.json({ state: true, msg: '修改成功' });
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                res.json({ state: false, msg: '密码为长度4-20的数字或字母或下划线' })
            }
        }
        else {
            res.json({ state: false, msg: '密保错误' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;