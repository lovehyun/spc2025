from dotenv import load_dotenv

from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

load_dotenv()

llm = OpenAI(temperature=0.2)

tools = load_tools(["human"])

# 에이전츠 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할땐 끄는건데, 지금은 상세 내역을 살펴보기 위해서...
)

result = agent.invoke({'input': "너는 몇살이야?"})
print(result)
