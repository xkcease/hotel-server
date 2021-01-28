const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const { updateRoomImgByNumber } = require('../../api/room');

router.post('/uploadImg', (req, res) => {
    let dirPath = path.join(__dirname, '../../static/img');

    const form = new formidable.IncomingForm();
    form.uploadDir = dirPath;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }

        let extname = path.extname(files.file.name);
        let newPath = dirPath + '\\' + fields.number + extname;
        let img = 'http://localhost:9092/img/' + fields.number + extname;

        if (fields.oldImgName) {
            try {
                fs.unlinkSync(dirPath + '\\' + fields.oldImgName);
            } catch {
                console.log('image not exists');
            }
        }

        fs.rename(files.file.path, newPath, err => {
            if (err) {
                console.log(err);
                res.json({ state: false, msg: '上传失败' });
            }

            updateRoomImgByNumber(img, fields.number).then(() => {
                res.json({ state: true, msg: '上传成功', img });
            }).catch(err => {
                console.log(err);
            })
        });
    });
});

module.exports = router;