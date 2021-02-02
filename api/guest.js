const db = require('../db');

function queryGuestsByOid(oid) {
    const sql = `select * from guest where oid = ?`;
    return db.query(sql, [oid]);
}

function queryGuestByGid(gid) {
    const sql = `select * from guest where gid = ?`;
    return db.query(sql, [gid]);
}

function insertGuest(values) {
    const sql = `insert into guest(oid, gid, name) values ?`;
    return db.query(sql, [values]);
}


module.exports = {
    queryGuestsByOid,
    queryGuestByGid,
    insertGuest,
};