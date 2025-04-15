const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.send('사용자 > 프로필');
});

router.get('/settings', (req, res) => {
    res.send('사용자 > 셋팅');
});

module.exports = router;
