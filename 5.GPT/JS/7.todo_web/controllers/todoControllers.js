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

}

function deleteTodo(req, res) {

}

module.exports = {
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo
};
