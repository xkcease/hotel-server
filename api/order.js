const db = require('../db');

function queryAllOrders() {
    const sql = `select oid, uid, r.rid, number, place_time, 
        reservation_time, reservation_during, check_in_time, check_out_time, ro.state
        from room r, room_order ro where r.rid = ro.rid;`;
    return db.query(sql);
}

function queryOrderByOid(oid) {
    const sql = `select * from room_order where oid = ?`;
    return db.query(sql, [oid]);
}

function queryOrderByUid(uid) {
    const sql = `select * from room_order where uid = ?`;
    return db.query(sql, [uid]);
}

function queryReservedByUid(uid) {
    const sql = `select * from room_order where uid = ? and state = 0`;
    return db.query(sql, [uid]);
}

function insertOrder(order) {
    const sql = `insert into room_order(oid, rid, uid, place_time, reservation_time, reservation_during, check_in_time, check_out_time, state, type)
                     values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, [...order]);
}

function updateOrderByOid(reservation_time, reservation_during, oid) {
    const sql = `update room_order set reservation_time = ?, reservation_during = ? where oid = ?`;
    return db.query(sql, [reservation_time, reservation_during, oid]);
}

function checkInApi(obj, oid) {
    const sql = `update room_order set check_in_time = ?, state = ? where oid = ?`;
    return db.query(sql, [obj.check_in_time, obj.state, oid]);
}

function checkOutApi(obj, oid) {
    const sql = `update room_order set check_out_time = ?, state = ? where oid = ?`;
    return db.query(sql, [obj.check_out_time, obj.state, oid]);
}

function deleteOrder(oid) {
    const sql = `delete from room_order where oid = ?`;
    return db.query(sql, [oid]);
}


module.exports = {
    queryAllOrders,
    queryOrderByOid,
    queryOrderByUid,
    queryReservedByUid,
    insertOrder,
    updateOrderByOid,
    checkInApi,
    checkOutApi,
    deleteOrder,
};