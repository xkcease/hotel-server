const express = require('express');
const router = express.Router();
const cache = require('../../module/cache');
const weappCofig = require('../../module/weappConfig');
const WXBizDataCrypt = require('../../module/WXBizDataCrypt')
const { updatePhone } = require('../../api/user');

router.post('/getPhone', (req, res) => {
    let user = cache.get(req.body.sessionId);
    let pc = new WXBizDataCrypt(weappCofig.appid, user.sessionKey);
    let data = pc.decryptData(req.body.encryptedData, req.body.iv);

    updatePhone(user.uid, data.purePhoneNumber).then(result => {
        if (result.affectedRows) {
            res.json({ state: true, phone: data.phoneNumber });
        }
        else {
            res.json({ state: false, msg: 'error' });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router; 