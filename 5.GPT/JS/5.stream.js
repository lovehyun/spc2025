const { OpenAI } = require('openai');
require('dotenv').config({path:'../.env'})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getGPTResponse(userInput) {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a highly skilled pianist.' },
            { role: 'user', content: userInput }
        ],
        temperature: 0.7,
        stream: true // 스트리밍 방식 설정
    });

    // return response.choices[0].message.content;
    for await (const chunk of response) {
        const content = chunk.choices[0].delta.content || '';
        console.log(content);
    }
}

async function chatWithUser() {
    const userInput = '안녕 챗봇. 나 이제 뭘 해볼까?';
    const chatGPTResponse = await getGPTResponse(userInput);
    console.log('챗봇 응답: ', chatGPTResponse);
}

chatWithUser();
