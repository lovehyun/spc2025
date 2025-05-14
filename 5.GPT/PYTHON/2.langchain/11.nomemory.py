from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.1)

prompt = ChatPromptTemplate.from_messages([
    ("human", "{input}")
])

chain = prompt | llm

def chat(message):
    response = chain.invoke({"input": message})
    return response.content

print(chat("안녕"))
print(chat("우리 무슨 이야기를 할까?"))
print(chat("난 스포츠에 대한 이야기를 하고 싶어?"))
print(chat("근데, 우리 무슨 이야기 하고 있었지?"))