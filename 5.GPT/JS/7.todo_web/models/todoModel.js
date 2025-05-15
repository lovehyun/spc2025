const db = require('./database');

function getAllTodos() {
    const rows = db.prepare('SELECT * FROM todos').all();
    // 필요시 rows를 내가 원하는 json으로 재변환
    return rows;
}

function getTodoById(id) {
    return db.prepare('SELECT * FROM todos WHERE id=?').get(id);
}

function addTodo(text) {
    return db.prepare('INSERT INTO todos (text) VALUES (?)').run(text);
}

function updateTodoState(id, completed) {
    return db.prepare('UPDATE todos SET completed=? WHERE id=?').run(completed, id);
}

function deleteTodoById(id) {
    return db.prepare('DELETE FROM todos WHERE id=?').run(id);
}

module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodoState,
    deleteTodoById
};
