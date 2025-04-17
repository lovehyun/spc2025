# https://pypi.org/project/pip/
# pip install requests

import requests

# 네이버 주세요~~
resp = requests.get("http://www.naver.com")
print("웹 페이지 내용: ", resp) # 객체인것 확인, 객체 타입은 Response
print("헤더정보: ", resp.headers)
print("바디데이터는: ", resp.text)
