# https://docs.python.org/ko/3.12/library/datetime.html#module-datetime
import datetime

current_time = datetime.datetime.now()
print("현재 시간: ", current_time)

# 특정 날짜 시간을 정의하고 싶으면?
specific_time = datetime.datetime(2025, 4, 17, 12, 30, 15)
print("내가 정한 시간: ", specific_time)
