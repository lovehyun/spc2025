# pip install transformers protobuf sentencepiece torch

# ~/.cache/hugginface 디렉토리 안에 모델들이 다운로드가 됨..

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv

from flask import Flask, request, jsonify  # flask 웹서비스 (express 같은것)

load_dotenv(dotenv_path='../.env')

app = Flask(__name__)  # flask 앱 초기화

model_name = "gpt2"

# 모델 불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

# 파이프라인 생성
generator = pipeline(
    "text-generation", 
    model=model,
    tokenizer=tokenizer,
    temperature=0.7, # 답변의 창의성 (확율 분포로 좀 더 넓은 범위..)
    max_new_tokens=128, # 출력 토큰의 길이
    pad_token_id=tokenizer.eos_token_id,
    do_sample=True,
    top_k=50, # 확율 분포상 높은 K개만 골라라...
    top_p=0.95, # 선택 확율이 높은 P% 내에서만 골라라...
    repetition_penalty=1.2, # 반복 억제
    no_repeat_ngram_size=3, # 3단어 이상 반복을 금지
)

# 질문~
# prompt = "What are good fitness tips?"
# outputs = generator(prompt)
# print(outputs[0]["generated_text"])

@app.route("/generate", methods=["POST"])
def generate():
    # 사용자로부터 받아온 입력 처리
    data = request.json
    prompt = data.get("prompt", "").strip()
    
    if not prompt:
        return jsonify({"error": "프롬프트를 입력하세요"}), 400
    
    result = generator(prompt)
    return jsonify({"response": result[0]["generated_text"]})

if __name__ == "__main__":
    app.run(port=5000)
