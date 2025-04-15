const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('메인');
});

module.exports = router;
