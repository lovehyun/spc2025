# 미션. 랭체인 라이브러리 왕창~
import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "my-data"
store = None

# 프롬푸트 코드
prompt = ChatPromptTemplate.from_template("""
당신은 문서 기반으로 사용자의 질문에 답변하는 챗봇입니다.
다음 문서를 참고해서 사용자의 질문에 답하시오.

문서:
{context}

질문:
{question}

답변:
""")

# LLM 설정
llm = ChatOpenAI(model='gpt-4o-mini')

output_parser = StrOutputParser()

def create_vector_db(file_path):
    global store
    
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    print(f"총페이지수: ", len(documents))

    text_splitter = CharacterTextSplitter(
        separator="\n\n", # 문서 구분할 단위
        chunk_size=1000, 
        chunk_overlap=100
    )
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings()

    if not os.path.exists(PERSIST_DIR):
        os.makedirs(PERSIST_DIR)
        
    # 폴더도 있고, 파일도 있으면, 불러오기
    if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        store = Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
            persist_directory=PERSIST_DIR)
        return store
    else: # 새로 만들기
        store = Chroma.from_documents(
            texts, 
            embeddings, 
            collection_name=COLLECTION_NAME,
            persist_directory=PERSIST_DIR
        )
        
    return store
    
def answer_question(question):
    # DB로부터 검색해서.. 체인 invoke하는 코드까지...
    if store is None:
        return "문서가 업로드 되지 않았습니다. 먼저 PDF를 업로드 해주세요."
    
    docs = store.similarity_search(question, k=5)
    context = "\n\n".join([doc.page_content for doc in docs])
    
    # 체인 구성
    chain = prompt | llm | output_parser

    result = chain.invoke({
        "context": context, "question": question
    })    
    
    return f"질문: {question}\n응답: {result}\n"

