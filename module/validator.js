const usernameReg = /^[0-9A-Za-z]{2,20}$/;
const passwordReg = /^\w{4,20}$/;
const idkeyReg = /^[0-9A-Za-z]{4,20}$/;
const roomNumberReg = /^[0-9A-Za-z]{3,8}$/;


function validateUser({ username, password, idkey }) {
    if (!usernameReg.test(username)) {
        return { state: false, msg: '用户名为长度2-20的数字或字母' }
    }

    if (!passwordReg.test(password)) {
        return { state: false, msg: '密码为长度4-20的数字或字母或下划线' }
    }

    if (!idkeyReg.test(idkey)) {
        return { state: false, msg: '密保为长度4-20的数字或字母' }
    }

    return { state: true, msg: '格式正确' };
}

function validateUsername(username) {
    return usernameReg.test(username);
}

function validatePassword(password) {
    return passwordReg.test(password);
}

function validateIdkey(idkey) {
    return idkeyReg.test(idkey);
}

function validateRoomNumber(number) {
    return roomNumberReg.test(number);
}

module.exports = {
    validateUser,
    validateUsername,
    validatePassword,
    validateIdkey,
    validateRoomNumber,
}
