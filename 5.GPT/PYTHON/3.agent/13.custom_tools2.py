import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_experimental.plan_and_execute import PlanAndExecute, load_agent_executor, load_chat_planner
from langchain_openai import ChatOpenAI
from langchain.tools import tool

load_dotenv()

@tool
def get_current_weather(location: str) -> str:
    """특정 위치의 현재 날짜 정보를 가져옵니다."""
    # 나중에는 이곳에 실제 외부 API 연동하는 코드를 작성하면 됨.
    weather_data = {
        "서울": "맑음, 기온 22도",
        "부산": "흐림, 기온 25도",
        "제주": "비, 기온 20도"
    }
    return weather_data.get(location, f"{location}의 날씨 정보가 없습니다.")

@tool
def get_population(city: str) -> str:
    """특정 도시의 인구 정보를 가져옵니다."""
    # 가상 데이터
    population_data = {
        "서울": "약 970만명",
        "부산": "약 340만명",
        "인천": "약 300만명",
        "대구": "약 240만명"
    }
    return population_data.get(city, f"{city}의 인구 정보가 없습니다.")

# 도구 일단 담아주기...
tools = [get_current_weather, get_population]

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0) # agent 와 연동할때는 가능한한 창의력을 낮게 해서 예측 가능한 문장이 들어오게 함.

# 에이전트 초기화
agent = initialize_agent(
    tools = tools,
    llm = llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True,
)

result = agent.invoke({"input": "제주의 날씨는 어때? 그리고 인구는 몇 명이야?"})
print("최종결과: ", result)
