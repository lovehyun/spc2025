from dotenv import load_dotenv
# from openai import OpenAI
# pip install langchain langchain-openai
from langchain_openai import OpenAI

load_dotenv(dotenv_path='../.env')
# 2024.01월부터 기본값이 gpt-3.5-turbo-instruct 로 바뀌었음. 그전까지는 text-davinci-003
llm = OpenAI()
# print(llm)

prompt = '회사 이름을 작명하고 싶어. 나의 회사는 아케이드 게임을 만드는 회사야.'

result = llm.generate([prompt]*5)
for data in result.generations:
    print(data[0].text)
