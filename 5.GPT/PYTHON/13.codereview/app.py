import os
from flask import Flask, send_from_directory, request
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import requests

load_dotenv()

app = Flask(__name__)
llm = OpenAI(temperature=0.7, max_tokens=1000)
prompt = ChatPromptTemplate.from_messages([
    ("system", "당신은 소프트웨어 개발자로, 코드리뷰를 전문적으로 하는 사람입니다."),
    ("user", """
다음 소스코드를 보고, 당신의 의견을 말해주세요. 
개선해야할 부분이 있다면, 어디를 어떻게 수정해야 하는지 라인번호와 함께 알려주세요.

소스코드:
----------
{code}
----------
""")
])
chain = prompt | llm | StrOutputParser()

@app.route('/')
def index():
    # return send_from_directory(app.static_folder, 'index.html')
    return send_from_directory(app.static_folder, 'index2.html')

def convert_github_url_to_raw(url):
    import re
    
    # https://github.com/계정명/리포명/blob/브랜치명/1.python_basics/1.usage/datascience.py
    # https://raw.githubusercontent.com/계정명/리포명/refs/heads/브랜치명/1.python_basics/1.usage/datascience.py
    # 입력값에서 / 로 구분지어서 [3] = 계정명, [4] = 리포명, [6]=브랜치명
    # 그러나 정규표현식으로 하면 매우 간결해짐
    pattern = r"^https://github\.com/(.+)/blob/(.+)$"
    match = re.match(pattern, url)
    
    if match:
        return f"https://raw.githubusercontent.com/{match.group(1)}/{match.group(2)}"
    else:
        raise ValueError("유효한 GitHub blob URL이 아닙니다.")

@app.route('/api/check', methods=['POST'])
def check():
    import re
    data = request.get_json()
    # code = data['code']
    github_url = data['github_url']
    print(github_url)
    
    # 미션1. 해당 github_url로부터 소스코드를 받아온다
    
    # 1-1. 소스코드 주소 변환
    raw_url = convert_github_url_to_raw(github_url)

    # 1-2. 요청
    resp = requests.get(raw_url)
    code = resp.text
    
    # 1-3. 코드 라인번호 추가
    def add_line_numbers(code):
        lines = code.splitlines()
        numbered_lines = [f"{i+1:4d}: {line}" for i, line in enumerate(lines)]
        return "\n".join(numbered_lines)
    
    numbered_code = add_line_numbers(code)
    print(numbered_code)
    
    # 1-4. 분석요청
    analaysis = chain.invoke({"code": numbered_code})
    
    return {'code': numbered_code, 'result': analaysis}

if __name__ == '__main__':
    app.run(debug=True)
