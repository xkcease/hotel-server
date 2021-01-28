const db = require('../db');

function queryAllRooms() {
    const sql = `select * from room`;
    return db.query(sql);
}

function queryRoomByNumber(number) {
    const sql = `select * from room where number = ?`;
    return db.query(sql, [number]);
}

function queryRoomsByType(type) {
    const sql = `select* from room where type = ?`;
    return db.query(sql, [type]);
}

function insertRoom(room) {
    const sql = `insert into room(id, number, type, shower, tv, extra, img) values(?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, [...room]);
}

function updateRoomByNumber(obj, number) {
    const sql = `update room set number = ?, type = ?, shower = ?, tv = ?, extra = ? where number = ?`;
    return db.query(sql, [...obj, number]);
}

function updateRoomImgByNumber(img, number) {
    const sql = `update room set img = ? where number = ?`;
    return db.query(sql, [img, number]);
}

function deleteRoomByNumber(number) {
    const sql = `delete from room where number = ?`;
    return db.query(sql, [number]);
}

module.exports = {
    queryAllRooms,
    queryRoomByNumber,
    queryRoomsByType,
    insertRoom,
    updateRoomByNumber,
    updateRoomImgByNumber,
    deleteRoomByNumber,
};