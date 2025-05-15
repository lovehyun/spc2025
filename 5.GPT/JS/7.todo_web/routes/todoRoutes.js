const express = require('express');
const router = express.Router();

const { getAllTodos, addTodo, toggleTodo, deleteTodo } = require('../controllers/todoControllers')

router.get('/api/todos', getAllTodos);
router.post('/api/todos', addTodo);
router.put('/api/todos', toggleTodo);
router.delete('/api/todos', deleteTodo);

module.exports = router;
