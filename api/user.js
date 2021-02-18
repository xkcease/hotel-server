const db = require('../db');

function queryAllUsers() {
    const sql = `select * from user;`;
    return db.query(sql);
}

function queryUserByUid(uid) {
    const sql = `select * from user where uid = ?;`;
    return db.query(sql, [uid]);
}

function insertUser(uid) {
    const sql = `insert into user(uid) values(?);`
    return db.query(sql, [uid]);
}


function updatePhone(uid, phone) {
    const sql = `update user set phone = ? where uid = ?`;
    return db.query(sql, [phone, uid])
}

function deleteUser(uid) {
    const sql = `delete from user where uid = ?`;
    return db.query(sql, [uid]);
}

module.exports = {
    queryAllUsers,
    queryUserByUid,
    insertUser,
    updatePhone,
    deleteUser,
};