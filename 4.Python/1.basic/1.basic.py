print('hello, world')

x = 5
y = 3
str = "Hello, World"

print("덧셈:", x + y)
print("뺄셈:", x - y)
print("곱셈:", x * y)
print("나눗셈:", x / y)

print("덧셈: {x} + {y}")
print(f"덧셈: {x} + {y}")

print(str.lower())
# print(x.lower()) # 오류 발생
print(str.upper())

# strip(), lstrip(), rstrip(), split(), replace(), ... 찾아서 사용해볼것

s = "apple,banana,cherry"
s_list = s.split(",")
print(s)
print(s_list)
print(s_list[0])  # 첫번째 항목
print(s_list[2])  # 세번째 항목
# print(s_list[3])  # 초과하는것, 인덱스에 없는것, 예외(Exception) 이 발생.. IndexError

