import requests
from bs4 import BeautifulSoup
import csv # csv 로 저장하고 싶을때
import json # json 으로 저장하고 싶을때
# import opnepyxl  # 엑셀로 저장하고 싶을때
# import gspread  # 구글 스프레드쉬트에 저장하고 싶을때
from urllib.parse import urlparse, urljoin
import os

BASE_URL = 'https://www.moviechart.co.kr'
MOVIERANK_URL = urljoin(BASE_URL, '/rank/realtime/index/image')
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
}

# HTML 요청하기
response = requests.get(MOVIERANK_URL, headers=HEADERS)
# if (response.status_code == 200):
#     print('성공')
response.raise_for_status() # 오류 발생 시 예외 발생

soup = BeautifulSoup(response.text, 'html.parser')

# 결과 저장할 리스트
movies = []
movies_json = []

# 이미지를 저장할 디렉토리 생성
os.makedirs('thumbnails', exist_ok=True)

# 미션. 영화 랭킹을 가져오시오...
# 제목, 이미지URL, 상세페이지링크
movie_cards = soup.select('div.movieBox li.movieBox-item')
print('무비카드 개수: ', len(movie_cards))

# 파일명 정리 함수 (특수문자제거)
def sanitize_filename(name):
    import re # 로컬에 선언해도 되고, 맨 위에 선언해도 되고 (보통 후자가 더 일반적이기는 함)
    return re.sub(r'[\\/*?:"<>| ]','_', name) # r = replace (앞에조건에온특수문자들을 _ 밑줄로 변환) 
    

for card in movie_cards:
    # print(card)
    title_tag = card.select_one('div.movie-title h3')
    img_tag = card.select_one('img')
    link_tag = card.select_one('a')
    
    # if title_tag:
    #     title = title_tag.text.strip()
    # else:
    #     title = '제목없음'
    
    title = title_tag.text.strip() if title_tag else '제목없음'
    image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else '이미지없음'
    
    thumbnail_url = urljoin(BASE_URL, image_url)
    image_data = requests.get(thumbnail_url, headers=HEADERS).content
    if len(image_data) > 0:
        safe_filename = sanitize_filename(title)
        filename = f"thumbnails/{safe_filename}.jpg"
        with open(filename, 'wb') as f: # wb 에서의 b 는 바이너리 데이터
            f.write(image_data)
    
    detail_link = 'https://www.moviechart.co.kr' + link_tag['href'] if link_tag else '링크없음'
    
    print(f"제목: {title}, 이미지: {image_url}, 상세페이지: {detail_link}")
    
    # CSV는 일반 리스트가 더 효율적인 자료구조조
    movies.append([title, image_url, detail_link])
    
    # JSON은 일반 리스트로 저장할수 없음.. 그래서 Dict 로 저장해야함.
    movies_json.append({
        "title": title,
        "image_url": image_url,
        "detail_link": detail_link
    })

# csv 파일로 저장
csv_filename = 'movie_chart.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['제목', '이미지URL', '상세링크']) # 헤딩 한줄 쓴것
    writer.writerows(movies)

    print(f"CSV 저장 완료: {csv_filename}")

# json 파일로 저장
json_filename = 'movie_chart.json'
with open(json_filename, 'w', encoding='utf-8') as f:
    json.dump(movies_json, f, ensure_ascii=False, indent=4)

    print(f"JSON 저장 완료: {json_filename}")
