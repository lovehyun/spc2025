from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables.history import RunnableWithMessageHistory

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini")

prompt = ChatPromptTemplate.from_messages([
    ("system", "너는 친절한 AI챗봇이야"),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

chain = prompt | llm | StrOutputParser()

memory = ChatMessageHistory()

chatbot = RunnableWithMessageHistory(
    chain,
    lambda _: memory,
    input_messages_key="input",
    history_messages_key="history"
)

session_id = "default"

print("AI챗봇에 오신 것을 환영합니다. '종료' 라고 입력하면 대화를 종료합니다.")
while True:
    user_input = input("나: ")
    if user_input.lower() in ["종료", "exit", "quit"]:
        print("대화를 종료합니다.")
        break
    
    response = chatbot.invoke({"input": user_input}, config={"configurable": {"session_id": session_id}})
    print("AI: ", response)
