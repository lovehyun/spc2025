const express = require('express');
const morgan = require('morgan');

const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const mainRouter = require('./router/mainRouter');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(port, () => {
    console.log('서버 레디');
});
