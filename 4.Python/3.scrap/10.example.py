# https://www.pythonscraping.com/pages/page3.html

# 미션1. 해당 페이지에 요청한다
# 미션2. 해당 페이지를 파싱해서 상품명과 가격을 출력한다.

import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.pythonscraping.com/pages/page3.html')
# print(response.text)

soup = BeautifulSoup(response.text, 'html.parser')
# print(soup)
gifts = soup.select('#giftList > tr')
print(len(gifts))

for g in gifts[1:]: # 첫번째 빈 th를 제외하고 나머지...
    tds = g.select('td')
    title = tds[0].text.strip()
    price = tds[2].text.strip()
        
    print(f"상품명: {title:30} 가격: {price:20}")
