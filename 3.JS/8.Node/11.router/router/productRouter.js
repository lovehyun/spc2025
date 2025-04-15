const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
    res.send('상품 > 목록');
});

router.get('/details', (req, res) => {
    res.send('상품 > 디테일');
});

router.get('/:id/details', (req, res) => {
    res.send('상품 > 개별상품 > 디테일');
});

router.get('/coupons', (req, res) => {
    res.send('상품 > 쿠폰');
});

module.exports = router;

