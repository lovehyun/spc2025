const express = require('express');
const router = express.Router();
const db = require('../models/database');
const todoModel = require('../models/todoModel');

router.post('/api/chat', async (req, res) => {
    const { question } = req.body;

    let answer;
    
    const todos = todoModel.getAllTodos();
    const jsonReply = await requestChatGPT(todos, question);
    console.log(jsonReply)

    const { action, item } = jsonReply;
    console.log(`그래서 내가할일은: ${action}, ${item}`)

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

async function requestChatGPT(userData, userInput) {
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                input: `${userInput}`,
                data: `${JSON.stringify(userData)}`
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = router;
