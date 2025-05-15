const express = require('express');
const router = express.Router();

const { getAllTodos, addTodo, toggleTodo, deleteTodo } = require('../controllers/todoControllers')

router.get('/api/todos', getAllTodos);
router.post('/api/todos', addTodo);
router.put('/api/todos/:id', toggleTodo);
router.delete('/api/todos/:id', deleteTodo);

module.exports = router;
