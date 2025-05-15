// 1. [Client] -> [Routes](여기에서 직접 DB CRUD)
// 2. [Client] -> [Routes] -> [Controllers](여기에서 직접 DB CRUD)
// 3. [Client] -> [Routes] -> [Controllers] -> [Models](여기에서 직접 DB CRUD)
// 4. [Client] -> [Routes] -> [Controllers] -> [Services] -> [Models](여기에서 직접 DB CRUD) 
//
// 이전까지는 2번이었고, 이 파일에서 SQL구문을 직접 호출했고,
// 지금은 3번으로 진행중... 그래서 SQL구문을 model파일에서 호출함..

const todoModel = require('../models/todoModel');

function getAllTodos(req, res) {
    const rows = todoModel.getAllTodos();
    console.log(rows);
    const todos = rows.map(row => ({
        id: row.id,
        text: row.text,
        completed: row.completed
    }));

    res.json(todos);
}

function addTodo(req, res) {
    const { text } = req.body;
    todoModel.addTodo(text);
    res.json({"message":"ok"});
}

function toggleTodo(req, res) {
    const id = req.params.id;
    const row = todoModel.getTodoById(id);
    const newState = row.completed ? 0 : 1;
    todoModel.updateTodoState(id, newState);
    res.json({"message":"ok"});
}

function deleteTodo(req, res) {
    const id = req.params.id;
    todoModel.deleteTodoById(id);
    res.json({"message":"ok"});
}

module.exports = {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo
};
