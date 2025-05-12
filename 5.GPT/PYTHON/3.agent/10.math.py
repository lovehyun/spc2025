from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(model="gpt-4o-mini")  # 또는 "gpt-3.5-turbo"

tools = load_tools(["llm-math"], llm=llm)

agent = initialize_agent(
    tools=tools,
    llm=llm,
    # agent_type="zero-shot-react-description",
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# result = agent.invoke("123 * (4 + 5) 는 얼마야?")
# result = agent.invoke("삼각형의 높이가 5이고 밑변이 10이면 넓이는 얼마야?")
question = """
기차가 시속 80km로 2시간반을 달렸고, 이후 100km로 1시간반을 달렸어.
이 기차가 이동한 총 거리는 얼마이고, 평균 속도는 얼마인가요?
"""
result = agent.invoke(question)
print(result["output"])
