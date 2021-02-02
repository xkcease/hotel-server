const db = require('../db');

function queryAllPrice() {
    const sql = `select * from price`;
    return db.query(sql);
}

function queryPriceByType(type) {
    const sql = `select * from price where type = ?`;
    return db.query(sql, [type]);
}

function insertPrice(values) {
    const sql = `insert into price(type, price) values ?`;
    return db.query(sql, [values]);
}

function updatePrice(array) {
    const sql = `update price set price = ? where type = ?`;
    return db.query(sql, [...array]);
}

module.exports = {
    queryAllPrice,
    queryPriceByType,
    insertPrice,
    updatePrice,
};