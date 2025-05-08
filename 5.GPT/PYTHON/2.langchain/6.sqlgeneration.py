from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음 요청에 대한 SQL 쿼리문을 작성하시오. 설명없이 오직 SQL 구문만을 보여주시오.\n\n{query}"

prompt = PromptTemplate(input_variables=["query"], template=template)
llm = OpenAI(temperature=0.3) # 쿼리문이라 창의력 없이 정확하게...

chain = prompt | llm | RunnableLambda(lambda x: {"sql": x.strip()})

example_input = {
    "query": "List the name and email of users who signed up after Jan, 1, 2024"
}
result = chain.invoke(example_input)

print("생성된 쿼리문:")
print(result["sql"])
