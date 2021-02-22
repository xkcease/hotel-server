const express = require('express');
const router = express.Router();
const { validateGid } = require('../../module/validator');
const { createOid } = require('../../module/utils');
const { queryRoomByNumber, updateRoomStateByNumber } = require('../../api/room');
const { queryReservedByUid, insertOrder, checkInApi } = require('../../api/order');
const { insertGuest } = require('../../api/guest');
const Order = require('../../domain/Order');
const Guest = require('../../domain/Guest');

// insertOrder 需修改， 业务逻辑已变
router.post('/checkIn', async (req, res) => {
    let obj = req.body.obj;
    let guests = req.body.guests;

    for (let guest of guests) {
        if (!validateGid(guest.gid)) {
            return res.json({ state: false, msg: '身份证格式不对' });
        }
    }

    // 已预定
    if (obj.uid) {
        try {
            let result = await queryReservedByUid(obj.uid);
            if (result.length) {
                await checkInApi({ check_in_time: obj.check_in_time, state: 1 }, result[0].oid);

                let values = [];
                for (let guest of guests) {
                    values.push([...new Guest(result[0].oid, guest.gid, guest.name)]);
                }

                await insertGuest(values);
                return res.json({ state: true, msg: '办理成功' });

            } else {
                return res.json({ state: false, msg: '未预订房间' });
            }
        } catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            let result = await queryRoomByNumber(obj.number);
            if (result.length) {
                await updateRoomStateByNumber(1, obj.number);
                let order = new Order(createOid(), result[0].rid, null, obj.place_time, obj.reservation_time, obj.reservation_during,
                    obj.check_in_time, null, 1);

                await insertOrder(order);

                let values = [];
                for (let guest of guests) {
                    values.push([...new Guest(order.oid, guest.gid, guest.name)]);
                }

                await insertGuest(values);
                return res.json({ state: true, msg: '办理成功' });

            } else {
                return res.json({ state: false, msg: '房间不存在' });
            }
        } catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;