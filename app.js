const url = require('url');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': 'http://localhost:9090' || 'http://localhost:9091',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require('./routes/login'));
app.use(require('./module/tokenInterceptor'));
app.use(require('./routes/userInfo'));
app.use(require('./routes/updatePassword'));





app.listen(9092, () => {
    console.log('server running http://localhost:9092');
})