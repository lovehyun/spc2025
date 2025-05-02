const axios = require('axios');
require('dotenv').config({path:'../.env'}) // .env 파일 읽어서 메모리에 올리기

const openaiApiKey = process.env.OPENAI_API_KEY;

// console.log(openaiApiKey);

// const url = 'https://api.openai.com/v1/responses'; // 문장 생성용 API 라서, 그닥.... Once upon a time, 
const url = 'https://api.openai.com/v1/chat/completions';

async function getGPTResponse() {
    const response = await axios.post(url, {
    // 본문
        model: "gpt-3.5-turbo",
        messages: [
            // {role: 'system', content: 'you are a helpful assistant.'}, // 가장 기본적인 시스템 프롬푸트
            {'role': 'system', 'content': 'you are a cook.'},
            // {'role': 'system', 'content': 'you are a software engineer.'}, 
            // {'role': 'system', 'content': 'you are a singner.'}, 
            {role: 'user', content: '여름에 먹기 좋은 음식을 알려줘. 세문장으로 각각 1.2.3 으로 답변해줘.'},
        ],
        temperature: 0.1, // 정확도 (창의성)
        top_p: 0.9, // 확율 기반 토큰 선택 범위
        frequency_penalty: 0.5, // 반복 억제
        presence_penalty: 0.6, // 얼마나 새로운 주제를 가져올거냐... 등등..
        max_tokens: 1000
    }, 
    {
    // 헤더
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`
        }
    })

    return response.data.choices[0].message;
}

(async () => { 
    const ai_response = await getGPTResponse();
    console.log(ai_response);
})();
