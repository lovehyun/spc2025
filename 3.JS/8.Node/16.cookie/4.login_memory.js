const express = require('express');
const session = require('express-session'); // 1
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

const users = [
    {id: 1, username: 'user1', password: 'password1'},
    {id: 2, username: 'user2', password: 'password2'},
]

app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(session({ // 2
    secret: 'this-is-my-password',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/user', (req, res) => {
    const user = req.session.user; //4

    if (user) {
        const { username, password } = req.session.user; // 5
        res.send(`당신은 계정명은 ${username} 이고 비밀번호는 ${password} 입니다.`);
    } else {
        res.send('로그인하고오시오...'); // 7
    }
});

app.get('/logout', (req, res) => { // 6
    req.session.destroy();
    res.send(`안녕히가세요...`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    const user = users.find((u) => u.username === username && u.password === password);
    // let user = null;
    // for (let i = 0; i < users.length; i++) {
    //     console.log(users[i], username, password, users[i]===username, users[i]===password);
    //     if (users[i].username === username && users[i].password === password) {
    //         user = users[i];
    //         break;
    //     }
    // }
    console.log('유저: ', user);
    if (user) {
        req.session.user = { username: user.username, password: user.password } // 3
        res.json({ message: '로그인 성공'});
    } else {
        res.status(401).json({ message: '로그인 실패'});
    }
});

app.listen(port, () => {
    console.log('서버레디');
});
