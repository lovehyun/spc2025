# pip install transformers protobuf sentencepiece torch

# ~/.cache/hugginface 디렉토리 안에 모델들이 다운로드가 됨..

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

model_name = "mistralai/Mistral-7B-Instruct-v0.3"

# 모델 불러오기
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto")

# 파이프라인 생성
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# 질문~
prompt = "What are good fitness tips?"
outputs = generator(prompt)

print(outputs[0]["generated_text"])
