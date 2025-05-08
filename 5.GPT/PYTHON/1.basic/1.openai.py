import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv() # 현재 폴더의 .env 읽어오기
# load_dotenv(dotenv_path='../.env')


# client = OpenAI(
#     api_key=os.getenv('OPENAI_API_KEY') # 이거 어차피 기본 환경변수명이라서, 이렇게 안써도 자동 로딩됨.
# )

client = OpenAI()

model_list = client.models.list()
for m in model_list:
    print(m.id)
