import os
from flask import Flask, send_from_directory, request
from dotenv import load_dotenv
from analyzers import openai_analyzer, anthropic_analyzer

import requests

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index2.html')

def convert_github_url_to_raw(url):
    import re
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
    provider = data['provider']
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
    print('분석요청할모델: ', provider)
    if provider == "openai":
        analaysis = openai_analyzer.analyze(numbered_code)
    elif provider == "anthropic":
        analaysis = anthropic_analyzer.analyze(numbered_code)
    else:
        analaysis = "아직 구현되지 않은 LLM 모델입니다." 
    
    return {'code': code, 'result': analaysis}

if __name__ == '__main__':
    app.run(debug=True)
