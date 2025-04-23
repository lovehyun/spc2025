-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- 상품 테이블
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL
);

-- 샘플 사용자 데이터 추가
INSERT INTO users (username, password) VALUES ('user1', 'password1');
INSERT INTO users (username, password) VALUES ('user2', 'password2');

-- 샘플 상품 데이터 추가
INSERT INTO products (name, price) VALUES ('Apple', 2000);
INSERT INTO products (name, price) VALUES ('Banana', 3000);
INSERT INTO products (name, price) VALUES ('Orange', 1500);
