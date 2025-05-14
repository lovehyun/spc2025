from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

load_dotenv()

PERSIST_DIR = "./chroma_db"
COLLECTION_NAME = "secure_coding_python"

embeddings = OpenAIEmbeddings()

store = Chroma(
    collection_name = COLLECTION_NAME,
    embedding_function = embeddings,
    persist_directory = PERSIST_DIR
)

count = store._collection.count()
print(f"저장된 문서 개수: {count}")

# 아무 문서나 10개 주시오...
# results = store._collection.get(include=["documents", "metadatas"], limit=10)
# ids = results["ids"]
# docs = results["documents"]
# metadatas = results["metadatas"]

# for i, doc in enumerate(docs):
#     print(f"[문서]: {i+1}")
#     print(f"[문서ID]: {ids[i]}")
#     print(f"[내용(앞100글자)]: {doc[:100]}")
#     print(f"[메타데이터]: {metadatas[i]}")


# 상위 5개의 유사 문서 조회
docs = store.similarity_search("경복궁", k=5)
for i, doc in enumerate(docs):
    print(f"[문서]: {i+1}")
    print(f"[문서ID]: {doc.id}")
    print(f"[내용(앞100글자)]: {doc.page_content}")
    print(f"[메타데이터]: {doc.metadata}")
