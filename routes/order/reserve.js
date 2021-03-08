const express = require('express');
const router = express.Router();
const { createOid } = require('../../module/utils');
const { insertOrder, updateUserOrderByOid, queryOrderByTypeAndTime } = require('../../api/order');
const { queryRoomsByTypeAndState } = require('../../api/room');
const Order = require('../../domain/Order');
const cache = require('../../module/cache');

module.exports = function (io) {
    router.post('/reserve', async (req, res) => {
        let obj = req.body;

        const reservedOrders = await queryOrderByTypeAndTime(obj.reservation_time, obj.reservation_during, obj.type);
        const vacantRooms = await queryRoomsByTypeAndState(obj.type, 0);
        const availableNumber = vacantRooms.length - reservedOrders.length;

        if (obj.number > availableNumber) {
            return res.json({ state: false, msg: '该时段只剩' + availableNumber + '间空房' });
        }

        try {
            if (!obj.oid) {                        // 添加订单
                let orderArray = [];
                let user = cache.get(req.body.sessionId);

                let order = new Order(createOid(), null, user.uid, Date.now(), obj.reservation_time, obj.reservation_during,
                    null, null, 0, obj.type, obj.phone, obj.number);

                orderArray.push(order);

                let result = await insertOrder(order);
                if (result.affectedRows) {
                    res.json({ state: true, msg: '预订成功' });
                    io.emit('new-order', { orderArray });
                }
                else {
                    res.json({ state: false, msg: 'error' });
                }
            }
            else {              // 修改订单
                updateUserOrderByOid(obj.reservation_time, obj.reservation_during, obj.phone, obj.number, obj.oid).then(() => {
                    res.json({ state: true, msg: '修改成功' });
                }).catch(err => {
                    console.log(err);
                });
            }
        } catch (err) {
            console.log(err);
        }
    });

    return router;
}
