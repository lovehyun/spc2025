const express = require('express');
const path = require('path');
require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

// console.log(process.env.OPENAI_API_KEY);
const app = express();
const port = 3000;

const conversationHistory = [];

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// system: 시스템 프롬푸트
// user: 사용자 질문
// assistant: 챗봇 응답
app.post('/api/chat', async (req, res) => {
    const { userInput } = req.body;
    console.log('userInput: ', userInput);
    // 이전 대화 내용에 추가
    conversationHistory.push({role:'user', content: userInput})
    const chatGPTResponse = await getChatGPTResponse(userInput);
    console.log(chatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', conversationHistory);
    console.log('-----');
    conversationHistory.push({role:'assistant', content: chatGPTResponse})
    res.json({'message': chatGPTResponse});
});

const CHATGPT_URL = 'https://api.openai.com/v1/chat/completions';


async function getChatGPTResponse(userInput) {
    const response = await axios.post(
        // URL, body, header
        CHATGPT_URL,
        {
            model: 'gpt-3.5-turbo', // gpt-4o, gpt-4o-mini, 등등 우리의 모델
            messages: [
                { role: 'system', content: 'You are a helpful assistant. Please remember our conversion history in memory and respond accordingly.' },
                // { role: 'user', content: userInput },
                ...conversationHistory
            ]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        }
    );

    return response.data.choices[0].message.content; // 응답이 담겨있는 자료구조
}

// Server listening logic
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

