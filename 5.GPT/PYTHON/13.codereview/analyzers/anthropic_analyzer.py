from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatAnthropic(model="claude-3-7-sonnet-20250219", temperature=0.7, max_tokens=1000)

def build_prompt():
    return (
        "다음 소스코드를 보고, 당신의 의견을 말해주세요. "
        "개선해야할 부분이 있다면, 어디를 어떻게 수정해야 하는지 각 영역별로 라인번호와 함께 알려주세요."
        "이때 라인번호는 다음과 같은 규격으로 답변해줘. '라인 번호: num' 또는 '라인 번호: start-end'"
        "소스코드:"
        "----------"
        "{code}"
        "----------"
    )


def analyze(code):
    prompt = ChatPromptTemplate.from_messages([
        ("system", "당신은 소프트웨어 개발자로, 코드리뷰를 전문적으로 하는 사람입니다."),
        ("user", build_prompt())
    ])

    chain = prompt | llm | StrOutputParser()

    return chain.invoke({"code": code})
