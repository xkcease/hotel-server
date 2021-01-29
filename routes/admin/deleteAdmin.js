const express = require('express');
const router = express.Router();
const { deleteAdminByUsername } = require('../../api/admin');

router.post('/deleteAdmin', (req, res) => {
    deleteAdminByUsername(req.body.username).then(result => {
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