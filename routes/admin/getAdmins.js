const express = require('express');
const router = express.Router();
const { queryAllAdmins } = require('../../api/admin');

router.post('/getAdmins', (req, res) => {
    if (!req.body.username && !req.body.password) {
        queryAllAdmins().then(result => {
            for (let admin of result) {
                Reflect.deleteProperty(admin, 'password');
                Reflect.deleteProperty(admin, 'idkey');
            }

            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }
});

module.exports = router;