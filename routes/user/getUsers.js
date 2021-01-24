const express = require('express');
const router = express.Router();
const { queryAllUsers } = require('../api/user');

router.post('/getUsers', (req, res) => {
    if (!req.body.username && !req.body.password) {
        queryAllUsers().then(result => {
            for (let user of result) {
                Reflect.deleteProperty(user, 'password');
                Reflect.deleteProperty(user, 'idkey');
            }

            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }
});

module.exports = router;