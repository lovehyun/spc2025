name = 'John'

# 1. 기본 프린트 구문
print("Hello,", name) # 기본 띄어쓰기

print("Hello,", name, "!") # 기본 띄어쓰기

print("Hello, " + name + "!") # 수동 띄어쓰기

# 2. f-문자열 (f-string) 표기법
print(f"Hello, {name}!")

# 3. 문자열 포멧팅
print('--- 3 ---')
print("Hello, {}!".format(name))
print("Hello, {}!\nGoodBye, {}".format(name, name))

name = "James"
age = 30

print("안녕하세요 {}님, 당신은 {}살 이군요.".format(name, age))
print("안녕하세요 {1}님, 당신은 {0}살 이군요.".format(name, age))

# 4. % 연산자 사용
print('--- 4 ---')
print("Hello, %s!" % name)
