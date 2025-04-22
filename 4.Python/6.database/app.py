import sqlite3

# DB 접속 및 입출력을 위한 포인터 (즉 커서) 를 가져오기
conn = sqlite3.connect('users.db')
cur = conn.cursor()

cur.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
    )
''')

# 사용자 조회하기
cur.execute('SELECT COUNT(*) FROM users')
count = cur.fetchone()[0] # 전달받은 튜플에서의 첫번째 값을 달라..

if count == 0:
    cur.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('Alice', 30))
    cur.execute('INSERT INTO users (name, age) VALUES (?, ?)', ('Bob', 25))
    # 지금까지 한걸 저장
    conn.commit()
else:
    print(f'이미 데이터가 {count}개 존재함')

# 모든 데이터 가져오기
cur.execute('SELECT * FROM users')
data = cur.fetchall() # 모든 데이터 받아오기 [(), ()] 튜플의 리스트로 반환...
print(data)

for row in data:
    print(f'이름: {row[1]}, 나이: {row[2]}')

# 접속 종료
conn.close()
