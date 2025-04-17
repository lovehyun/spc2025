# result = 10 / 0

try:
    result = 10 / 0
except ZeroDivisionError:
    print("0으로 나눌수 없습니다.")

print('다음거 실행 가능...')

def convert_str_to_int(string):
    try:
        result = int(string)
        return result
    except ValueError:
        return "숫자만 입력해주세요"


result = convert_str_to_int("10")
print("변환된숫자: ", result)

result = convert_str_to_int("hello")
print("변환된숫자: ", result)
