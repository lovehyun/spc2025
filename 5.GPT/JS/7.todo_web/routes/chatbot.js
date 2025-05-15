const express = require('express');
const router = express.Router();

router.post('/api/chat', (req, res) => {
    const { question } = req.body;

    return res.send({ answer: `Echo: ${question}`});
});

module.exports = router;
