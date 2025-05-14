import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv()


# 저장할 공간 정의
PERSIST_DIR = "./chroma_db"

def create_vector_db():
    # 1. 텍스트 문서 읽기기
    loader = TextLoader('./my-docs.txt', encoding='utf-8')
    documents = loader.load()

    # 문서에 메타데이터 추가
    documents = [Document(page_content=doc.page_content, metadata={"source": "traveldocs.txt"}) for doc in documents]

    # 2. 문서안의 내용을 vector화 해서 저장
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    store = Chroma.from_documents(
        texts, 
        embeddings, 
        collection_name="travel",
        persist_directory=PERSIST_DIR)
    return store

def load_vector_db():
    embeddings = OpenAIEmbeddings()
    store = Chroma(
        collection_name="travel",
        embedding_function=embeddings,
        persist_directory=PERSIST_DIR)
    return store

# DB가 없으면 생성할거고, 있으면 로딩...
if os.path.exists(PERSIST_DIR):
    print("DB가 있어서 불러오는중...")
    store = load_vector_db()
else:
    print("DB가 없어서 만드는중...")
    store = create_vector_db()

# 3. 대화하기 위한 모델 정의
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# 4. 데이터를 추출할 소스 정의
retriever = store.as_retriever()

# 5. 질문 템플릿 생성
template = """
다음 내용을 참고해서 사용자의 질문에 답변하시오: 
{context}

만약, 정보가 없으면 모른다고 답변해줘. 정보가 있으면, 정보를 가져온 출처를 알려줘.
질문: {question}

답변을 작성하고 마지막에 "출처: " 라고 해서 문서의 출처를 명시해줘.
"""

prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
)

# response = chain.invoke('서울의 유명한 관광지를 알려주시오')
# print(response.content)

def answer_question(question):
    result = chain.invoke(question)
    
    if "출처:" in result.content:
        answer, sources = result.content.split("출처:", 1)
    else:
        answer = result.content.strip()
        sources = "출처 정보를 찾을수 없습니다."
        
    return f"질문: {question}\n응답: {answer}\n출처: {sources}"
    
print(answer_question("서울의 유명한 관광지를 알려주시오"))
print(answer_question("경복궁에 대해서 알려주시오"))

