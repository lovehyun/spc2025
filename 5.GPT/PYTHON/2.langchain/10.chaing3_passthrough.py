from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda, RunnablePassthrough

load_dotenv()

# 입력값: "주제"
# -> 이 주제를 갖는 회사명을 만들고
# -> 그 회사명을 기반으로, 회사의 슬로건 (캐치프레이즈) 를 만들것임.


# 1. 기본 프롬프트 템플릿을 사용한 질의 응답 패턴
chat_prompt1 = PromptTemplate(
    input_variables = ['product'],
    # template="You are a professional naming consultant. What is a good name for a company that makes {product}?"
    template="너는 회사 이름을 전문적으로 짓는 작명가야, 다음 상품/서비스를 갖는 회사명을 지어줘. 설명없이, 한단어로 회사명을 지어줘. 상품명: {product}"
)

chat_prompt2 = PromptTemplate(
    input_variables=["company_name"],
    # template="Write a slogan (catch-phrase) for the folloing company name: {company_name}"
    template="이 회사를 잘 소개할수 있는 슬로건 (또는 catch-phrase) 를 만들어줘. 회사명: {company_name}"
)

chat_prompt3 = PromptTemplate(
    input_variables=["company_name"],
    # template="Write a slogan (catch-phrase) for the folloing company name: {company_name}"
    template="이 회사를 잘 소개할수 있는 소개 문장 글을 작성해줘. 500글자 정도 분량으로 소개해줘. 회사명: {company_name}, 슬로건: {catch_phrase}"
)

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.9, max_tokens=1000)

chain1 = (
    {"product": lambda x: x["product"]} 
    | RunnablePassthrough.assign(
        company_name=lambda x: llm.invoke(chat_prompt1.format(product=x["product"])).strip()
    ) 
    | RunnablePassthrough.assign(
        catch_phrase=lambda x: llm.invoke(chat_prompt2.format(company_name=x["company_name"])).strip()
    )
    | RunnablePassthrough.assign(
        description=lambda x: llm.invoke(chat_prompt3.format(
            company_name=x["company_name"],
            catch_phrase=x["catch_phrase"]
        )).strip()
    )
)

response1 = chain1.invoke({"product": "김치"})
print("최종회사명:", response1["company_name"])
print("최종캐치프레이즈:", response1["catch_phrase"])
print("최종회사소개문구\n", response1["description"])