# pip install langchain-anthropic
import os
from dotenv import load_dotenv
# from langchain_openai 이거 불러왔듯이...
from langchain_anthropic import ChatAnthropic
from langchain.prompts import PromptTemplate

load_dotenv()

# 초기 모델 설정
# llm = ChatOpenAI() 처럼...
llm = ChatAnthropic(
    model="claude-3-7-sonnet-20250219",
    # anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
    temperature=0.7,
    max_tokens=1000
)

response = llm.invoke("인공지능이란?")
print(response.content)

print('-'*50)

template = PromptTemplate.from_template("다음 주제에 대해 설명해주세요.\n\n주제:{topic}")
prompt = template.format(topic="GPT")

# response = llm.invoke(prompt)
# print(response.content)

chain = template | llm
reponse = chain.invoke({"topic": "Claude"})
