const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const { updateHotelIntroImg, updateRoomIntroImgByType } = require('../../api/intro');

router.post('/uploadIntroImg', (req, res) => {
    let dirPath = path.join(__dirname, '../../static/img');

    const form = new formidable.IncomingForm();
    form.uploadDir = dirPath;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }

        let nameArray = ['king_room', 'single_room', 'double_room'];
        let type = parseInt(fields.type);

        let imgName = type === -1 ? 'hotelIntro' : nameArray[type];

        let extname = path.extname(files.file.name);
        let newPath = dirPath + '\\' + imgName + extname;
        let img = 'http://localhost:9092/img/' + imgName + extname;
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

            if (type === -1) {
                updateHotelIntroImg(img, 1).then(() => {
                    res.json({ state: true, msg: '上传成功', img });
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                updateRoomIntroImgByType(img, type).then(() => {
                    res.json({ state: true, msg: '上传成功', img });
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    });
});

module.exports = router;