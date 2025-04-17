# https://docs.python.org/ko/3.12/library/math.html#module-math
import math

# 모듈명.함수명
# 모듈명.상수명
print(math.pi)

print(math.pow(5, 2)) # 5의 2승

radius = 5

# 원의 넓이는?
area = math.pi * radius ** 2
print(area)

area = math.pi * math.pow(radius, 2)
print(area)
