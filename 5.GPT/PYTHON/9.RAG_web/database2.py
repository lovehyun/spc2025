# 미션. 랭체인 라이브러리 왕창~
import os
from dotenv import load_dotenv
import json
import yaml

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
DATA_DIR = "./DATA"
store = None
PROMPT_FILE = "./prompts.json"

# 프롬푸트 코드
def load_prompts_from_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        prompt_data = json.load(f)
        print(prompt_data)
        return ChatPromptTemplate.from_template(prompt_data["messages"][0]["content"])
        #  JS 에서는.. prompt_data["messages"] => prompt_data.messages

def load_prompts_from_yaml(file_path):
     with open(file_path, "r", encoding="utf-8") as f:
        prompt_data = yaml.safe_load(f)
        print(prompt_data)
        return ChatPromptTemplate.from_template(prompt_data["messages"][0]["content"])
    
prompt = load_prompts_from_yaml(PROMPT_FILE)

# LLM 설정
llm = ChatOpenAI(model='gpt-4o-mini')

output_parser = StrOutputParser()

def initialize_vector_db():
    global store
    
    embeddings = OpenAIEmbeddings()
    
    if os.path.isdir(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        store = Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
            persist_directory=PERSIST_DIR)
        print('이전 데이터의 로딩이 완료되었습니다.')
        return store

def list_files():
    files = [f for f in os.listdir(DATA_DIR) 
             if os.path.isfile(os.path.join(DATA_DIR, f))]
    print(files)
    return files
    
def delete_file(file_path):
    # 1. DB에서 삭제한다
    # 컬랙션 내에서 해당 파일을 파싱하면서 생긴 데이터를 지워야 하는데...
    # metadata에 파일명이 잘 저장되어 있어야함... (metadata.source)
    result = store._collection.get(where={"source": file_path})
    docs = result.get("documents", [])
    metadatas = result.get("metadatas", [])
    print(f"존재하는 문서수: {len(docs)} {metadatas}")
    
    store._collection.delete(where={"source": file_path})
    
    # 2. 파일 자체를 삭제하다
    path = os.path.join(DATA_DIR, file_path)
    if os.path.exists(path):
        os.remove(path)
    

def create_vector_db(file_path):
    global store
    
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    
    # 우리의 메타데이터를 추가...
    for doc in documents:
        doc.metadata["source"] = os.path.basename(file_path)

    print(f"총페이지수: ", len(documents))

    text_splitter = RecursiveCharacterTextSplitter(
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
        
        # 내용 추가
        store.add_documents(texts)
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
    
    # 점수도 함께 포함해서 가져옴
    docs_with_score = store.similarity_search_with_score(question, k=5)
    context = "\n\n".join(
        [f"[문서 {i+1}] (score {round((1-score)*100,2)}%)\n{doc.page_content}"
         for i, (doc, score) in enumerate(docs_with_score)]
    )
    print(docs_with_score)
    
    # 체인 구성
    chain = prompt | llm | output_parser

    result = chain.invoke({
        "context": context, "question": question
    })
    
    # 답변 고도화
    source_lines = []
    for doc, score in docs_with_score:
        source = os.path.basename(doc.metadata.get("source", "unknown"))
        page = int(doc.metadata.get("page", 0)) + 1
        score_percent = round((1 - score) * 100, 2) # 대충 유사도 계산
        source_lines.append(f"{source} (page {page}, 유사도 {score_percent}%)")
    
    return (
        f"질문: {question}\n"
        f"응답: {result}\n"
        f"관련문서: \n" + "\n".join(f" - {line}" for line in source_lines)
        # - 문서1.pdf (5pg, 57.23%)
        # - 문서2.pdf (2pg, 59.23%)
        # - 문서3.pdf (6pg, 63.23%)
    )

