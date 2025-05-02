const express = require('express');
const morgan = require('morgan');
const OpenAI = require('openai');

require('dotenv').config({ path: '../../.env' });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.post('/api/sendQuestion', async (req, res) => {
    const { question } = req.body;
    console.log('Received question:', question);
    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: question }
            ],
        });

        const gptResponse = response.choices[0].message.content;
        res.json({ answer: gptResponse });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Failed to process your request.' });
    }
});

app.get('/api/sendQuestionStream', async (req, res) => {
    const { question } = req.query;
    console.log('Received question:', question);
    
    // SSE 헤서 설정 (스트리밍 활성화)
    res.setHeader('Content-Type', 'text/event-stream');

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: question }
            ],
            stream: true
        });

        for await (const chunk of response) {
            const content = chunk.choices[0].delta.content || '';
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`) // <- 프로토콜의 스펙상, data: 메세지, 나의 스트리밍이 끝났을때 \n\n
            }
        }

        // 스트리밍 완료
        res.write('data: [DONE]\n\n'); // <-- 이런 내용은 다 프로토콜 스펙에 정의 되어 있음..
        res.end();
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Failed to process your request.' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('서버 레디');
});
