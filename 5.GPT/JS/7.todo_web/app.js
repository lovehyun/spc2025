const express = require('express');
const morgan = require('morgan');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3000;

// 미들웨어
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 라우터 연결
app.use(todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
