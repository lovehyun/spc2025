from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('input')
    user_data = json.loads(data.get('data')) if data.get('data') else None
    print('사용자입력: ', user_input)
    print('사용자데이터: ', user_data)

    system_prompt = f"""
너는 투두리스트에 대응하는 챗봇입니다. 
그래서 사용자의 질문에 따라 "add", "done", "delete", "summary", "deleteall", "alldone" 의 액션을 선택할수 있어.
답변은 아무런 설명도 없이 json 으로만 답변해야해. json 태그 문법도 생략해줘.

답변은 다음의 포멧으로 해줘: {{"action": "text", "item": "text"}}

예시) "모든 일정을 다 완료 처리해줘" => {{"action": "alldone"}}
"숙제 완료했어" => {{"action":"done", "item":"숙제"}}
"모든 일정을 다 삭제해줘" => {{"action": "deleteall"}}
"오늘 내가 할일은?" => {{"action": "summary"}}
"""

    user_prompt = f"""
사용자질문:
{user_input}

사용자데이터:
{user_data}
"""

    print("[최종GPT에게 물어볼 프롬프트]: ", system_prompt)
    print("[최종GPT에게 물어볼 data프롬프트]: ", user_prompt)
    
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=150
        )
        generated_text = response.choices[0].message.content.strip()
        print("최종GPT응답: ", generated_text)
        return jsonify(generated_text)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
