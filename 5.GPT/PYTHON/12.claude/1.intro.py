# pip install anthropic

import os
import anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")

# client = openai 등등 했던것처럼...
client = anthropic.Anthropic(api_key=api_key)

message = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=1000,
    temperature=1.0,
    messages=[
        # {"role": "user", "content": "안녕하세요"}
        # {"role": "user", "content": "Python 으로 flask를 만들고 싶어. 가장 간단한 예제 코드를 보여줘."}
        # {"role": "user", "content": "GPT란 무엇인지 간단하게 주요 기능을 bullet 포인트로 작성해줘."}
        {"role": "user", "content": "나는 웹툰작가야. 아무 스토리나 만들어줘."}
    ]
)

print(message.content[0].text)
