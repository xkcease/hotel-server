const db = require('../db');

function queryAllUser() {
    const sql = `select * from user;`;
    return db.query(sql);
}

function queryUserByUsername(username) {
    const sql = `select * from user where username = ?;`;
    return db.query(sql, [username]);
}

function insertUser(user) {
    const sql = `insert into user(id, username, password, permission, idkey) values(?, ?, ?, ?, ?);`
    return db.query(sql, [...user]);
}

function updateUserPassword(password, username) {
    const sql = `update user set password = ? where username = ?`;
    return db.query(sql, [password, username])
}

function deleteUserByUsername(username) {
    const sql = `delete from user where username = ?`;
    return db.query(sql, [username]);
}

module.exports = {
    queryAllUser,
    queryUserByUsername,
    insertUser,
    updateUserPassword,
    deleteUserByUsername,
};