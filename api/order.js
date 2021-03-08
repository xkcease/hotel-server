const db = require('../db');

function queryAllOrders(state) {
    const sql = `select * from room_order where state = ?;`;
    return db.query(sql, [state]);
}

function queryAllOrdersOwnRoom(state) {
    const sql = `select oid, uid, r.rid, r.number, place_time, 
        reservation_time, reservation_during, check_in_time, check_out_time, ro.state, ro.type, ro.contact, ro.number as count
        from room r, room_order ro where r.rid = ro.rid and ro.state = ?;`;
    return db.query(sql, [state]);
}

function queryOrderByOid(oid) {
    const sql = `select * from room_order where oid = ?`;
    return db.query(sql, [oid]);
}

function queryOrderByUid(uid) {
    const sql = `select ri.*, p.price, ro.* from price p, room_intro ri, room_order ro where p.type = ri.type and ro.type = ri.type
        and ro.uid = ?`;
    return db.query(sql, [uid]);
}

function queryOrderByUidAndOid(uid, oid) {
    const sql = `select ri.*, p.price, ro.* from price p, room_intro ri, room_order ro where p.type = ri.type and ro.type = ri.type
        and ro.uid = ? and ro.oid = ?`;
    return db.query(sql, [uid, oid]);
}

function queryOrderByUidAndState(uid, state) {
    const sql = `select ri.*, p.price, ro.* from price p, room_intro ri, room_order ro where p.type = ri.type and ro.type = ri.type
        and ro.uid = ? and ro.state = ?`;
    return db.query(sql, [uid, state]);
}

function queryReservedByUid(uid) {
    const sql = `select * from room_order where uid = ? and state = 0`;
    return db.query(sql, [uid]);
}

function queryOrderByTypeAndTime(reservation_time, reservation_during, type) {
    const sql = `select * from room_order where reservation_time = ? and reservation_during = ? and type = ?`;
    return db.query(sql, [reservation_time, reservation_during, type]);
}

function insertOrder(order) {
    const sql = `insert into room_order(oid, rid, uid, place_time, reservation_time, reservation_during, 
        check_in_time, check_out_time, state, type, contact, number) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, [...order]);
}

function insertSomeOrders(values) {
    const sql = `insert into room_order(oid, rid, uid, place_time, reservation_time, reservation_during, 
        check_in_time, check_out_time, state, type, contact, number) values ?`;
    return db.query(sql, [values]);
}

function updateOrderByOid(reservation_time, reservation_during, oid) {
    const sql = `update room_order set reservation_time = ?, reservation_during = ? where oid = ?`;
    return db.query(sql, [reservation_time, reservation_during, oid]);
}

function updateUserOrderByOid(reservation_time, reservation_during, contact, number, oid) {
    const sql = `update room_order set reservation_time = ?, reservation_during = ?, contact = ?, number = ? where oid = ?`;
    return db.query(sql, [reservation_time, reservation_during, contact, number, oid]);
}

function updateOrderOwnTypeByOid(reservation_time, reservation_during, type, oid) {
    const sql = `update room_order set reservation_time = ?, reservation_during = ?, type = ? where oid = ?`;
    return db.query(sql, [reservation_time, reservation_during, type, oid]);
}

function checkInApi(obj, contact, oid) {
    const sql = `update room_order set rid = ?, check_in_time = ?, state = ?, contact = ? where oid = ?`;
    return db.query(sql, [obj.rid, obj.check_in_time, obj.state, contact, oid]);
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
    queryAllOrdersOwnRoom,
    queryOrderByOid,
    queryOrderByUid,
    queryOrderByUidAndOid,
    queryOrderByUidAndState,
    queryReservedByUid,
    queryOrderByTypeAndTime,
    insertOrder,
    insertSomeOrders,
    updateOrderByOid,
    updateUserOrderByOid,
    updateOrderOwnTypeByOid,
    checkInApi,
    checkOutApi,
    deleteOrder,
};