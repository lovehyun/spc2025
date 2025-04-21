from flask import Flask, request, jsonify
# from flask import jsonify


app = Flask(__name__)

users = [
    {'id': 1, 'name': 'Alice', 'age': 25, 'phone': '123-456-7890'},
    {'id': 2, 'name': 'Bob', 'age': 30, 'phone': '222-456-7890'},
    {'id': 3, 'name': 'Charlie', 'age': 35, 'phone': '333-456-7890'},
    {'id': 4, 'name': 'Alice', 'age': 35, 'phone': '444-456-7890'},
]

@app.route('/')
def main():
    return "메인"

@app.route('/users')
def get_users():
    return jsonify(users) # 헤더에 application/json 도 넣고... dict로 json 으로 변환하고.. (물론, 똑같지만.)

@app.route('/users/<int:user_id>')
def get_user_by_id(user_id):
    # user = None
    # for u in users:
    #     if u['id'] == user_id:
    #         user = u
    #         break # 찾았으면 중단하는게, 효율적인 검색
        
    # 위에 있는 5줄 짜리 코드를 한줄로 표현하기 - 그냥 참고용 (모던 파이썬 스타일 - 굳이 이렇게까지 안짜도 무방함)
    user = next((user for user in users if user['id'] == user_id), None)
        
    if user is not None:
        return jsonify(user)
    else:
        return jsonify({'error': 'User not found'})

if __name__ == "__main__":
    app.run()
