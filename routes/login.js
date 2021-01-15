const express = require('express');
const router = express.Router();
const { queryAllUser, queryAllUserByUsername, insertUser, deleteUserByUsername } = require('../api/user');
const { getToken } = require('../module/jwt')


router.post('/login', (req, res) => {

    queryAllUserByUsername(req.body.username).then(result => {
        if (result.length && req.body.password === result[0].password) {
            const token = getToken(result[0].username);
            res.json({ state: true, token });
        }
        else {
            res.json({ state: false, msg: '用户名或密码错误' });
        }
    }).catch(err => {
        console.log(err);
    });
});

router.post('/add', (req, res) => {
    insertUser(['c', 'acqds', 3, 'cqeddas12']).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
});

router.post('/delete', (req, res) => {
    deleteUserByUsername('c').then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;