# https://docs.python.org/ko/3.12/library/os.html#module-os
import os

# 현재 로그인한 사용자 계정 출력 (윈도우, 리눅스 도 가능하다)
print(os.getlogin())

current_dir = os.getcwd()
print("현재 작업 디렉토리: ", current_dir)

new_dir = "new_directory다"
# os.mkdir(new_dir)
# os.rmdir(new_dir)

# 생성 및 삭제.. 중복으로는 불가함..

print(os.getenv('PATH'))
