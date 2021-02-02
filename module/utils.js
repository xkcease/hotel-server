function createOid() {
    let orderCode = '';

    for (let i = 0; i < 3; i++) {
        orderCode += Math.floor(Math.random() * 10);
    }

    orderCode = Date.now() + orderCode;

    return orderCode;
}

module.exports = {
    createOid,
}