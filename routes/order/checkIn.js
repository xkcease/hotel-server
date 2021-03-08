const express = require('express');
const router = express.Router();
const { validateGid } = require('../../module/validator');
const { createOid } = require('../../module/utils');
const { queryRoomByNumber, updateRoomStateByNumber } = require('../../api/room');
const { queryOrderByOid, insertOrder, checkInApi } = require('../../api/order');
const { insertGuest } = require('../../api/guest');
const Order = require('../../domain/Order');
const Guest = require('../../domain/Guest');


router.post('/checkIn', async (req, res) => {
    let obj = req.body.obj;
    let contact = req.body.contact;
    let guests = req.body.guests;

    for (let guest of guests) {
        if (!validateGid(guest.gid)) {
            return res.json({ state: false, msg: '身份证格式不对' });
        }
    }

    // 已预定
    if (obj.uid) {
        try {
            let result = await queryOrderByOid(obj.oid);
            if (result.length) {
                await updateRoomStateByNumber(1, obj.number);

                let roomResult = await queryRoomByNumber(obj.number);

                await checkInApi({ rid: roomResult[0].rid, check_in_time: obj.check_in_time, state: 1 }, contact, obj.oid);

                let values = [];
                for (let guest of guests) {
                    values.push([...new Guest(obj.oid, guest.gid, guest.name)]);
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
                    obj.check_in_time, null, 1, obj.type, contact, 1);

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