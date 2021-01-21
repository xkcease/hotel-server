const crypto = require('crypto');

// const salt = crypto.randomBytes(16);
const salt = '42e46b2bf62fbc1ce710b17abab4543d';


function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, deriveKey) => {
            if (err) {
                reject(err);
            }

            resolve(deriveKey.toString('hex'));
        })
    });
}

function encryptPasswordSync(password) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

module.exports = {
    encryptPassword,
    encryptPasswordSync,
};