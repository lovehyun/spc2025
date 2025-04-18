# https://sports.news.naver.com/index

# 미션1. 뉴스의 타이틀(제목) 만 가져와서 출력한다
# 미션2. 해당 뉴스의 원본 URL을 가져온다 (그래서, 그 URL을 클릭했을때 해당 사이트로 갈 수 있도록)

import requests
from bs4 import BeautifulSoup

response = requests.get('https://sports.news.naver.com/index')
# print(response.text)

soup = BeautifulSoup(response.text, 'html.parser')
news = soup.select('.today_list > li')
# news = soup.select('.today_item')
# print(len(news))

for n in news:
    a_tag = n.select_one('a')
    # print(a_tag['title'].strip()) # a태그의 프로퍼티로 가져온다
    
    # title = n.select_one('.title') # 클래스명 title로 가져온다
    # print(title.text)
    
    strong = n.select_one('strong') # 태그로 가져온다
    print(strong.text)
    
    print(a_tag['href'])
    
# 미션3-1. 해당 뉴스 기사 페이지의 상세 내용도 가져오기
# 미션3-2. 긴 기사 내용의 앞에 100글자만 화면에 출력하기
