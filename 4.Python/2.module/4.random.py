# https://docs.python.org/ko/3.12/library/random.html#module-random

import random

print("랜덤 숫자: ", random.randint(1, 100))

# 미션. 주사위 던지기 함수를 구현한다.
def roll_dice():
    return random.randint(1, 6)
    
print("주사위 던진 결과: ", roll_dice())
