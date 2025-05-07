const express = require('express');
const path = require('path');
require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const Database = require('better-sqlite3');

// console.log(process.env.OPENAI_API_KEY);
const app = express();
const port = 3000;

// const conversationHistory = []; // DB 로 대체....
// SQLite DB 설정
// const db = new Database(':memory:'); // 파일에 저장하지 않고, 메모리에 임시 저장하는 DB
const db = new Database('history2.db'); // 파일에 저장하기

db.exec(`
    CREATE TABLE IF NOT EXISTS session (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS conversation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id INTEGER,
        role TEXT,
        content TEXT)
`);

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index3.html'));
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

function getRecentConversation() {
    const stmt = db.prepare('SELECT * FROM conversation ORDER BY id DESC LIMIT 10'); // 최근 10개의 대화를 가져옴
    const rows = stmt.all();
    return rows.reverse(); // 최근 10개 가져와서, 오래된 질문을 먼저 넣기 위해서 순서 바꿈...
}

// 새로운 세션 생성 - API 네이밍은 좋은 스타일은 아님.. 그냥 이해를 돕기 위해서...
app.post('/api/new-session', (req, res) => {
    const result = db.prepare("INSERT INTO session DEFAULT VALUES").run();
    res.json({success: true, sessionId: result.lastInsertRowid })
});

// 전체 세션 목록 조회
app.get('/api/all-sessions', (req, res) => {
    const sessions = db.prepare("SELECT id, start_time FROM session ORDER BY start_time DESC").all();
    res.json({ allSessions: sessions });
});

function getCurrentSession() {
    const session = db.prepare("SELECT id, start_time FROM session ORDER BY start_time DESC LIMIT 1").get();
    if (!session) {
        // 최근 대화가 없으면?? 새로 만들기...
        const insert = db.prepare("INSERT INTO session DEFAULT VALUES").run();
        return db.prepare("SELECT id, start_time FROM session WHERE id=?").get(insert.lastInsertRowid);
    }
    return session;
}

function getConversationBySession(sessionId) {
    return db.prepare("SELECT * FROM conversation WHERE session_id=? ORDER BY id").all(sessionId);
}

// 최근 세션의 대화 내용 다 가져오기
app.get('/api/current-session', (req, res) => {
    const session = getCurrentSession();
    const conversationHistory = getConversationBySession(session.id);
    res.json({id: session.id, start_time: session.start_time, conversationHistory});
});

// 특정 세션 대화 내용 가져오기
app.get('/api/session/:sessionId', (req, res) => {

});

// system: 시스템 프롬푸트
// user: 사용자 질문
// assistant: 챗봇 응답
app.post('/api/chat', async (req, res) => {
    const { userInput } = req.body;
    console.log('userInput: ', userInput);
    // 이전 대화 내용에 추가
    // conversationHistory.push({role:'user', content: userInput}) // DB에 쿼리문 INSERT
    db.prepare('INSERT INTO conversation (role, content) VALUES (?,?)').run('user', userInput);

    const previousConversation = getRecentConversation();

    const chatGPTResponse = await getChatGPTResponse(previousConversation);
    console.log(chatGPTResponse);
    console.log('-----');
    console.log('보낼전체대화내용:', previousConversation);
    console.log('-----');
    // conversationHistory.push({role:'assistant', content: chatGPTResponse})
    db.prepare('INSERT INTO conversation (role, content) VALUES (?,?)').run('assistant', chatGPTResponse);

    res.json({'message': chatGPTResponse});
});

const CHATGPT_URL = 'https://api.openai.com/v1/chat/completions';


async function getChatGPTResponse(previousConversation) {
    const response = await axios.post(
        // URL, body, header
        CHATGPT_URL,
        {
            model: 'gpt-3.5-turbo', // gpt-4o, gpt-4o-mini, 등등 우리의 모델
            messages: [
                // { role: 'system', content: 'You are a helpful assistant. Please remember our conversion history in memory and respond accordingly. 모든 답변은 최대한 간결하게 200글자 아래로 답변해줘.' },
                { role: 'system', content: '너는 스포츠 트레이너로 운동에 대해서 상세한 답변을 해줄수 있어. 운동과 관련된 질문이 아닐경우, 해당 질문은 적절하지 않다고 답변해줘. 모든 답변은 최대한 간결하게 200글자 아래로 답변해줘.' },
                // { role: 'user', content: userInput },
                ...previousConversation  // DB로부터 가져와야함.. SELECT
            ],
            temperature: 0.2 // 최대한 딱딱하게, 펙트 중심으로
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

