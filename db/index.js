const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool(config);


function connectHandle() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('connection error：' + err.stack + '\n' + 'connection id：' + connection.threadId)
                reject(err)
            } else {
                resolve(connection)
            }
        })
    })
}


async function query(sql, params) {
    const connection = await connectHandle();

    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {            // 事务开启
            if (err) {
                return 'transaction begin error';
            }
            else {
                connection.query(sql, params, (err, result) => {        // sql执行
                    if (err) {
                        connection.release();
                        reject(err);
                    }
                    else {
                        connection.commit(err => {                  // 事务提交
                            if (err) {
                                reject('transaction commit fali');
                            }
                        });

                        connection.release();
                        resolve(result);
                    }
                })
            }
        });
    });
}


module.exports = {
    query,
};




