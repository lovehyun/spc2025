const express = require('express');
const router = express.Router();
const db = require('../models/database');
const todoModel = require('../models/todoModel');

const { OpenAI } = require('openai');

require('dotenv').config();

const openai = new OpenAI();

router.post('/api/chat', async (req, res) => {
    const { question } = req.body;

    const reply = await requestChatGPT(command_prompt, question);

    let answer;

    // 챗봇에게 사용자 말을 전달하고, 그거에 따른 액션을 취해서 반환하게 해야함..
    // 그 액션에 따라서.. 수행할 행동은 내가 코딩해야함..
    let jsonReply = JSON.parse(reply)

    const { action, item } = jsonReply;
    console.log(`그래서 내가할일은: ${action}, ${item}`)

    const todos = todoModel.getAllTodos();

    switch (action) {
        case 'add':
            // 구현하기
            todoModel.addTodo(item);
            answer = '추가했음'
            break;
        case 'done':
            var findItem = todos.find(t => t.text.includes(item));
            todoModel.updateTodoState(findItem.id, 1);
            answer = '완료처리했음'
            break;
        case 'delete':
            var findItem = todos.find(t => t.text.includes(item));
            todoModel.deleteTodoById(findItem.id);
            answer = '삭제했음'
            break;
        case 'summary':
            const doneList = todos.filter(t => t.completed);
            const undoneList = todos.filter(t => !t.completed);
            const summary_data_prompt = buildSummaryPrompt(doneList, undoneList);
            const summaryText = await requestChatGPT(summary_system_prompt, summary_data_prompt);
            answer = summaryText;
            console.log(answer);
            break;

        default:
            answer = "아직 구현되지 않은 기능입니다."
    }

    return res.send({ answer: `${answer}`});
});

function buildSummaryPrompt(doneList, undoneList) {
    const doneStr = doneList.length > 0
        ? doneList.map(t => `- ${t.text}`).join('\n')
        : "없음";

    const undoneStr = undoneList.length > 0
    ? doneList.map(t => `- ${t.text}`).join('\n')
    : "없음";

    prompt = `
[완료한일]
${doneStr}

[아직남은일]
${undoneStr}
`
    console.log('[최종프롬푸트]:', prompt);
    return prompt
}

const summary_system_prompt = `
당신은 사용자의 하루를 요약해주는 비서입니다.
다음 아래 목록을 보고 오늘의 할일을 간결하게 요약해주세요.
`

    const command_prompt = `
너는 투두리스트에 대응하는 챗봇입니다. 
그래서 사용자의 질문에 따라 "add", "done", "delete", "summary", "deleteall", "alldone" 의 액션을 선택할수 있어.
답변은 아무런 설명도 없이 json 으로만 답변해야해. json 태그 문법도 생략해줘.

답변은 다음의 포멧으로 해줘: {"action": "text", "item": "text"}

예시) "모든 일정을 다 완료 처리해줘" => {"action": "alldone"}
"숙제 완료했어" => {"action":"done", "item":"숙제"}
"모든 일정을 다 삭제해줘" => {"action": "deleteall"}
"오늘 내가 할일은?" => {"action": "summary"}

`;

async function requestChatGPT(prompt, userInput) {

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: prompt},
            { role: 'user', content: userInput}
        ],
        temperature: 0.2
    })

    let content = response.choices[0].message.content.trim();
    console.log(`RAW데이터: ${content}`);
    return content;
}

module.exports = router;
