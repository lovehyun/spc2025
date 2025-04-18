# pip install bs4
# pip install beautifulsoup4

from bs4 import BeautifulSoup

html_doc = """
<html>
<head>
    <title>간단한 HTML 예제</title>
</head>
<body>
    <div class="container">
        <h1>안녕하세요</h1>
        <p>이것은 간단한 HTML 예제입니다.</p>
    </div>
    <ul>
        <li>항목 1</li>
        <li>항목 2</li>
        <li>항목 3</li>
    </ul>
    <div class="footer">
        <p id="copyright">저작권 copyright 2025. 내꺼</p>
    </div>
</body>
</html>    
"""

soup = BeautifulSoup(html_doc, 'html.parser')

# 클래스가 container 인 div를 가져오고 싶음
container_div = soup.find('div', class_='container')
print(container_div)
print(container_div.h1)
print(container_div.h1.text)

# 미션1. 푸터안의 글자를 가져오시오
footer_div = soup.find('div', class_='footer')
print(footer_div.p.text)

copyright = soup.find('p', id='copyright')
print(copyright.text)
