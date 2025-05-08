# 환경 변수 로딩용
from dotenv import load_dotenv

# LLM (예: OpenAI) 관련
from langchain_openai import OpenAI

# 에이전트 구성 도구
from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools

load_dotenv()

llm = OpenAI()

tools = load_tools(['google-search'])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 운영할땐 끄는건데, 지금은 상세 내역을 살펴보기 위해서...
)

result = agent.invoke({"input": "서울의 오늘 날씨는 어때?"})
print(result["output"])
