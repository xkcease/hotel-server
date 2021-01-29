const db = require('../db');

function queryAllAdmins() {
    const sql = `select * from admin;`;
    return db.query(sql);
}

function queryAdminByUsername(username) {
    const sql = `select * from admin where username = ?;`;
    return db.query(sql, [username]);
}

function insertAdmin(admin) {
    const sql = `insert into admin(aid, username, password, permission, idkey) values(?, ?, ?, ?, ?);`
    return db.query(sql, [...admin]);
}

function updateAdminPassword(password, username) {
    const sql = `update admin set password = ? where username = ?`;
    return db.query(sql, [password, username])
}

function updatePermission(username, permission) {
    const sql = `update admin set permission = ? where username = ?`;
    return db.query(sql, [permission, username])
}

function deleteAdminByUsername(username) {
    const sql = `delete from admin where username = ?`;
    return db.query(sql, [username]);
}

module.exports = {
    queryAllAdmins,
    queryAdminByUsername,
    insertAdmin,
    updateAdminPassword,
    updatePermission,
    deleteAdminByUsername,
};