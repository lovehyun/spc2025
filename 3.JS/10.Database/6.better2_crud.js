const sqlite = require('better-sqlite3');

const db = sqlite('test.db')

// 1. 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`);

// 2. 사용자 조회
const allusers = db.prepare('SELECT * FROM users');
const allusers_result = allusers.all();
console.log('조회된 사용자: ', allusers_result);

// 3. 신규 사용자 만들기
const newuser = {
    username: 'user1',
    email: 'user1@example.com'
}

const insert = db.prepare('INSERT INTO users (username, email) VALUES (?, ?)');
insert.run(newuser.username, newuser.email);

// 4. 특정 사용자만 조회
const userId = 1;
const user = db.prepare('SELECT * FROM users WHERE id = ?');
const auser = user.get(userId);

console.log('검색된 사용자: ', auser);

// 5. 사용자 정보 갱신
const updateUser = { // 해당 사용자의 원하는 '필드' 만 변경 가능함. 꼭 다 아니어도 됨.
    id: 1,
    username: 'user001',
    email: 'user001@example.com'
};

const update = db.prepare('UPDATE users SET username=?, email=? WHERE id=?');
update.run(updateUser.username, updateUser.email, updateUser.id);
console.log('사용자 정보 갱신 완료.');


// 6. 사용자 삭제
const deleteUser = {
    id: 2,
};

const deleteQ = db.prepare('DELETE FROM users WHERE id=?')
deleteQ.run(deleteUser.id);
console.log('삭제 완료');

// db연결 종료
db.close();
