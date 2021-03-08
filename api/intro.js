const db = require('../db');

function queryHotelIntro() {
    const sql = `select * from hotel_intro`;
    return db.query(sql);
}

function insertHotelIntro(hotelIntro) {
    const sql = `insert into hotel_intro(id, name, intro, options, address, contact, img) values(?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, [...hotelIntro]);
}

function updateHotelIntro(obj, id) {
    const sql = `update hotel_intro set name = ?, intro = ?, options = ?, address = ?, contact = ? where id = ?`;
    return db.query(sql, [...obj, id]);
}

function updateHotelIntroImg(img, id) {
    const sql = `update hotel_intro set img = ? where id = ?`;
    return db.query(sql, [img, id]);
}

function queryAllRoomIntros() {
    const sql = `select* from room_intro`;
    return db.query(sql);
}

function queryRoomIntroByType(type) {
    const sql = `select* from room_intro where type = ?`;
    return db.query(sql, [type]);
}

function insertRoomIntro(roomIntro) {
    const sql = `insert into room_intro(type, text, shower, tv, window, options, img, intro) values(?, ?, ?, ?, ?, ?, ?, ?)`;
    return db.query(sql, [...roomIntro]);
}

function updateRoomIntroImgByType(img, type) {
    const sql = `update room_intro set img = ? where type = ?`;
    return db.query(sql, [img, type]);
}

function updateRoomIntroByType(obj, type) {
    const sql = `update room_intro set text = ?, shower = ?, tv = ?, window = ?, options = ?, intro = ? where type = ?`;
    return db.query(sql, [...obj, type]);
}

module.exports = {
    queryHotelIntro,
    insertHotelIntro,
    updateHotelIntro,
    updateHotelIntroImg,
    queryAllRoomIntros,
    queryRoomIntroByType,
    insertRoomIntro,
    updateRoomIntroImgByType,
    updateRoomIntroByType,
};