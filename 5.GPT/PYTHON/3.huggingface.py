# pip install huggingface_hub
# HUGGINGFACEHUB_API_TOKEN=각자계정의키

from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv(dotenv_path='../.env')

# 가장 일반적으로 범용적으로 쓸수 있는 언어모델
client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.3")

prompt = "너 한국말 할줄 알아?"
response = client.text_generation(prompt)

print(response)
