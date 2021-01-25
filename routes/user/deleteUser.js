const express = require('express');
const router = express.Router();
const { deleteUserByUsername } = require('../../api/user');

router.post('/deleteUser', (req, res) => {
    deleteUserByUsername(req.body.username).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, msg: '删除成功' });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;