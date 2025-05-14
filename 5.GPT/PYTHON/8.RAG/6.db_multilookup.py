from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = ["secure_coding_python", "travel"]

embeddings = OpenAIEmbeddings()

stores = {
    name: Chroma(
        collection_name = name,
        embedding_function = embeddings,
        persist_directory = PERSIST_DIR
    )
    for name in COLLECTION_NAME
}

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("""
다음 문서들을 참고하여 질문에 답변해주세요:

문서들:
{context}

질문:
{question}
""")

chain = (
    prompt
    | llm
    | StrOutputParser()
)

def search_documents(question, k=3, target=None):
    if target:
        print(f"{target} 컬렉션에서 검색합니다.")
        return stores[target].similarity_search(question, k=k)
    else:
        print("모든 컬렉션에서 통합 검색합니다. (각 문서에서 2개씩...)")
        docs = []
        for store in stores.values():
            docs.extend(store.similarity_search(question, k=2))
        return docs
    
def ask(question, target_collection=None):
    docs = search_documents(question, target=target_collection)
    print('-'*50)
    print(docs)
    print('-'*50)
    context = "\n\n".join([doc.page_content for doc in docs])
    
    response = chain.invoke({"context": context, "question": question})
    
    print(f"\n[질문]: {question}")
    if target_collection:
        print(f"[대상 컬렉션]: {target_collection}")
    print(f"[참고문서수] {len(docs)}")
    print(f"[GPT최종응답]: {response}")

ask("서울주변 관광지는?", target_collection="travel")
ask("안전한 개발 방법은?", target_collection=None)
