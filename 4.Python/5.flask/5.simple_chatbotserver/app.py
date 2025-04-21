from flask import Flask, jsonify, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app) # 일단은 올허용 (보안은 일단 논외)

@app.route('/api/chat', methods=['POST'])
def chatbot():
    data = request.get_json() # 나한테 POST로 온 요청에서 json을 꺼내옴
    message = data.get('question', '') # question 을 꺼내오기
    if "배고파" in message:
        reply_msg = "나도 배고파"
    elif "집에갈래" in message:
        reply_msg = "가지마"
    else:
        reply_msg = message
    time.sleep(3) # 3초 지연 (그냥 챗봇이 생각하는 시간임)
    return jsonify({'question': f'{reply_msg}'})
    
if __name__ == "__main__":
    app.run(debug=True)

    