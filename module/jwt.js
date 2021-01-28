const jwt = require('jsonwebtoken');

const secretKey = 'hotel';

function getToken(payload) {
    return jwt.sign({ ...payload }, secretKey, { expiresIn: '1d' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}


module.exports = {
    getToken,
    verifyToken,
}