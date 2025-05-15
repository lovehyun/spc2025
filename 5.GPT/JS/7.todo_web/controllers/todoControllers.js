const db = require('../models/database')

function getAllTodos(req, res) {
    const rows = db.prepare('SELECT * FROM todos').all();
    console.log(rows);
    const todos = rows.map(row => ({
        id: row.id,
        text: row.text,
        completed: row.completed
    }))

    res.json(todos)
}

function addTodo(req, res) {
    const { text } = req.body;

    const stmt = db.prepare('INSERT INTO todos(text) VALUES (?)');
    const info = stmt.run(text);

    res.json({"message":"ok"})
}

function toggleTodo(req, res) {
    const id = req.params.id;

    // 현재 상태가져오기
    const row = db.prepare('SELECT * FROM todos WHERE id=?').get(id);
    const newState = row.completed ? 0 : 1;

    // 반전해서 저장하기
    const stmt = 'UPDATE todos SET completed=? WHERE id=?'
    db.prepare(stmt).run(newState, id);

    res.json({"message":"ok"})
}

function deleteTodo(req, res) {
    const id = req.params.id;

    db.prepare('DELETE FROM todos WHERE id=?').run(id);
    res.json({"message":"ok"})
}

module.exports = {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo
};
