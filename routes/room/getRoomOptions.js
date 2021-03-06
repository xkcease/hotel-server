const express = require('express');
const router = express.Router();
const { queryRoomsByTypeAndState } = require('../../api/room');
const { getHightBitOfNumber } = require('../../module/utils');

function addOptionsForNumber(option, number, prefix = '') {
    const hn = getHightBitOfNumber(number);
    const index = option.findIndex(obj => {
        return obj.value === hn;
    });

    if (index === -1) {
        option.push({
            value: hn,
            label: hn,
            children: [{
                value: prefix + number,
                label: prefix + number,
            }],
        });
    }
    else {
        option[index].children.push({
            value: prefix + number,
            label: prefix + number,
        });
    }
}

router.get('/getRoomOptions', (req, res) => {
    queryRoomsByTypeAndState(req.query.type, 0).then(result => {
        if (result.length) {
            const options = [];
            const r = /^[a-zA-Z]+/;
            const prefixArray = [];

            for (let room of result) {
                let number = room.number;

                let prefix = r.exec(number);
                if (prefix) {
                    let index = prefixArray.indexOf(prefix);
                    number.replace(r, '');

                    if (index === -1) {
                        prefixArray.push(prefix);
                        options.push({
                            value: prefix,
                            label: prefix,
                            children: [],
                        });

                        addOptionsForNumber(options[options.length - 1], number, prefix);
                    }
                    else {
                        addOptionsForNumber(options[index], number, prefix);
                    }
                }
                else {
                    addOptionsForNumber(options, number);
                }
            }

            options.sort((a, b) => {
                return a - b;
            });

            options.forEach(option => {
                option.children.sort((a, b) => {
                    return a - b;
                });
            });

            res.json({ state: true, options });
        }
        else {
            res.json({ state: false, msg: '房号获取错误' });
        }
    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;