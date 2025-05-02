const express = require('express');
const morgan = require('morgan');
const OpenAI = require('openai');

require('dotenv').config({path:'../../.env'})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log('서버 레디');
});
