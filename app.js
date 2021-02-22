const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, './static')));

app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:9090' || 'http://localhost:9091',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization,Cache-Control',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require('./routes/user/getUser'));
app.use(require('./routes/user/getPhone'));
app.use(require('./routes/user/loginUser'));

app.use(require('./routes/order/reserve'));

app.use(require('./routes/price/getPrice'));

app.use(require('./routes/intro/getHotelIntro'));
app.use(require('./routes/intro/getAllRoomIntros'));
app.use(require('./routes/intro/getRoomIntro'));

app.use(require('./routes/admin/login'));

app.use(require('./module/tokenInterceptor'));

app.use(require('./routes/order/checkIn'));
app.use(require('./routes/order/checkOut'));
app.use(require('./routes/order/getOrders'));
app.use(require('./routes/order/getOrderInfo'));
app.use(require('./routes/order/updateOrder'));
app.use(require('./routes/order/deleteOrder'));

app.use(require('./module/permissionInterceptor'));

app.use(require('./routes/room/getRooms'));
app.use(require('./routes/room/getRoomInfo'));
app.use(require('./routes/room/addRoom'));
app.use(require('./routes/room/uploadImg'));
app.use(require('./routes/room/updateRoom'));
app.use(require('./routes/room/deleteRoom'));

app.use(require('./routes/price/updatePrice'));
app.use(require('./routes/intro/updateHotelIntro'));
app.use(require('./routes/intro/updateRoomIntro'));
app.use(require('./routes/intro/uploadIntroImg'));

app.use(require('./routes/admin/adminInfo'));
app.use(require('./routes/admin/updatePassword'));
app.use(require('./routes/admin/getAdmins'));
app.use(require('./routes/admin/register'));
app.use(require('./routes/admin/updatePermission'));
app.use(require('./routes/admin/deleteAdmin'));



app.listen(9092, () => {
    console.log('server running http://localhost:9092');
});