const db = require('../db');

function queryAllUser() {
    const sql = `select * from user;`;
    return db.query(sql);
}

function queryAllUserByUsername(username) {
    const sql = `select * from user where username = ?;`;
    return db.query(sql, [username]);
}

function insertUser(params) {
    const sql = `insert into user(id, username, password, permission, idkey) values(null, ?, ?, ?, ?);`
    return db.query(sql, params);
}

function deleteUserByUsername(username) {
    const sql = `delete from user where username = ?`;
    return db.query(sql, [username]);
}

module.exports = {
    queryAllUser,
    queryAllUserByUsername,
    insertUser,
    deleteUserByUsername,
};