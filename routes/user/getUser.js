const express = require('express');
const router = express.Router();

router.get('/getUser', (req, res) => {
    res.json({ state: false, msg: 'error' });

});

module.exports = router; 