from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda

load_dotenv()

# 1. 기본 프롬프트 템플릿을 사용한 질의 응답 패턴
chat_prompt1 = ChatPromptTemplate.from_template(
    "너는 요리사야. 다음 질문에 대해서 답변해줘. \n\n[질문]: {input}"
)

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.5)

chain1 = chat_prompt1 | llm | RunnableLambda(lambda x: {"response": x.content})

response1 = chain1.invoke({"input": "김치는 어떻게 만들어?"})["response"]
print(response1)

print('-'*50)
# 2. 더 명확히 채팅 구조를 정의 해주는 라이브러리 함수 사용
system_template = "너는 전문 번역가야. 다음 글을 보고 {input_language} 로부터 {output_language} 로 번역을 해야해."
system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)
human_message_prompt = HumanMessagePromptTemplate.from_template("{text}")

chat_prompt2 = ChatPromptTemplate.from_messages(
    [system_message_prompt, human_message_prompt]
)

chain2 = chat_prompt2 | llm | RunnableLambda(lambda x: {"response": x.content})


response2 = chain2.invoke({"input_language": "영어", "output_language": "한국어", "text": "Hello, Nice to meet you"})['response']
print(response2)

print('-'*50)

# 3. 후처리 기능을 다른걸로 변경
from langchain_core.output_parsers import CommaSeparatedListOutputParser
chain3 = chat_prompt2 | llm | CommaSeparatedListOutputParser()

response3 = chain3.invoke({"input_language": "영어", "output_language": "한국어", "text": "Hello, Nice to meet you"})

print(response3)
