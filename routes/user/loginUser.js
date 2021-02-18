const express = require('express');
const router = express.Router();
const axios = require('axios');
const { queryUserByUid, insertUser } = require('../../api/user');
const weappCofig = require('../../module/weappConfig');
const cache = require('../../module/cache');
const { createSessionId } = require('../../module/utils');

router.post('/loginUser', async (req, res) => {
    try {
        let wxResult = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: weappCofig.appid,
                secret: weappCofig.secret,
                js_code: req.body.code,
                grant_type: 'authorization_code',
            }
        });

        let result = await queryUserByUid(wxResult.data.openid);
        if (!result.length) {
            await insertUser(wxResult.data.openid);
        }

        let data = {};
        data.phone = result[0]?.phone ?? null;
        data.sessionId = createSessionId();

        await cache.add(data.sessionId, { uid: wxResult.data.openid, sessionKey: wxResult.data.session_key });

        res.json({ state: true, data });
    } catch (err) {
        console.log(err);
        res.json({ state: false, msg: 'error' });
    }
});

module.exports = router; 