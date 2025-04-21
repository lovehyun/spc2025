import requests
from bs4 import BeautifulSoup
import csv # csv 로 저장하고 싶을때
import json # json 으로 저장하고 싶을때
# import opnepyxl  # 엑셀로 저장하고 싶을때
# import gspread  # 구글 스프레드쉬트에 저장하고 싶을때

URL = 'https://www.moviechart.co.kr/rank/realtime/index/image'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
}

# HTML 요청하기
response = requests.get(URL, headers=headers)
# if (response.status_code == 200):
#     print('성공')
response.raise_for_status() # 오류 발생 시 예외 발생

soup = BeautifulSoup(response.text, 'html.parser')

# 결과 저장할 리스트
movies = []
movies_json = []

# 미션. 영화 랭킹을 가져오시오...
# 제목, 이미지URL, 상세페이지링크
movie_cards = soup.select('div.movieBox li.movieBox-item')
print('무비카드 개수: ', len(movie_cards))

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
