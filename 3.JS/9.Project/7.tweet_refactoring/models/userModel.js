const { db } = require('./db');

function createUser(username, email, password, callback) {
    const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    db.run(query, [username, email, password], callback);
}

function findUserById(id, callback) {
    const query = 'SELECT * FROM user WHERE id = ?';
    db.get(query, [id], callback);
}

function findUserByEmail(email, callback) {
    const query = 'SELECT * FROM user WHERE email = ?';
    db.get(query, [email], callback);
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
}
