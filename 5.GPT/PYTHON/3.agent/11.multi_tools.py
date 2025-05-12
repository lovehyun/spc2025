# pip install langchain_community langchain_experimental
import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.utilities import GoogleSerperAPIWrapper, GoogleSearchAPIWrapper, WikipediaAPIWrapper
from langchain_experimental.plan_and_execute import PlanAndExecute, load_agent_executor, load_chat_planner
from langchain_openai import ChatOpenAI
from langchain.chains import LLMMathChain
from langchain.tools import Tool

load_dotenv()

# 필요한 키들이 다 있는지 확인
google_api_key = os.getenv('GOOGLE_API_KEY')
google_cse_id = os.getenv('GOOGLE_CSE_ID')

if not google_api_key or not google_cse_id:
    raise ValueError("필요한 구글 API 키들이 설정되어 있지 않습니다.")

# 모델 생성
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

# 각종 도구 설정
llm_math_chain = LLMMathChain.from_llm(llm=llm, verbose=True)
search = GoogleSearchAPIWrapper()
# search = GoogleSerperAPIWrapper() # SERPER_API_KEY 환경 변수 필요
wikipedia = WikipediaAPIWrapper()

# 사용할 에이전트 툴들 명시
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="Useful for answering questions using Google Search."
    ),
    Tool(
        name="Wikipedia",
        func=wikipedia.run,
        description="Useful for looking up facts and statistics."
    ),
    Tool(
        name="Calculator",
        func=llm_math_chain.run,
        description="Useful for answering math-related questions or calculations. But this does not include date related features."
    ),
]

# 계획 및 실행하기 위한 에이전트 정의
planner = load_chat_planner(llm)
executor = load_agent_executor(llm, tools, verbose=True)

agent = PlanAndExecute(planner=planner, executor=executor, verbose=True)

# 실제 질의 실행
prompt = "지난 1988 올림픽에서, 서울이 획득한 금매달, 은매달, 동매달의 합산 개수의 곱하기 2를 알려줘."
result = agent.invoke(prompt)

print(result)
