const express = require('express');
const router = express.Router();
const { encryptPasswordSync } = require('../../module/encrypt');
const { validateUser } = require('../../module/validator');
const { insertAdmin, queryAdminByUsername } = require('../../api/admin');
const User = require('../../domain/Admin');

router.post('/register', (req, res) => {
    queryAdminByUsername(req.body.username).then(result => {
        if (result.length <= 0) {
            const validation = validateUser(req.body);     // 校验
            if (!validation.state) {
                res.json(validation);
            }

            const user = new User(null, req.body.username, encryptPasswordSync(req.body.password), req.body.permission, req.body.idkey);
            insertAdmin(user).then(() => {
                res.json({ state: true, msg: '注册成功' });
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            res.json({ state: false, msg: '该用户已存在' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;