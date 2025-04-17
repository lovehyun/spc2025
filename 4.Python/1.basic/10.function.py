def greet(name):
    print(f"Hello, {name}!")
    # 리턴값은 없는것임

greet("Alice")

# 인자 두개 받기
def add(x, y):
    print(x)
    return x + y
    # 리턴이 있는것
    
result = add(2,3)
print(result)

# 함수 인자의 기본값
def greet_default(name="Guest"):
    print(f"Hello, {name}!")
    
greet_default()
greet_default('John')

# 함수 인자 위치 지정도 가능함
def example(a, b, c):
    print(f"a:{a}, b:{b}, c:{c}")
    
example(1,2,3)
example(a=1, b=2, c=3)
example(a=1, c=3, b=2)

def print_gugudan(dan):
    print(f"{dan}단")
    for i in range(1, 10):
        print(f'{dan} x {i} = {dan*i}')

print_gugudan(2)

# 미션. 구구단을 다 출력하시오.. 2~9단까지
def print_full_gugudan():
    for i in range(2, 10):
        print(f"{i}단")
        for j in range(1, 10):
            print(f"{i} x {j} = {i * j}")
        print() # 빈줄 한칸
        
print_full_gugudan()

print('-'*50)
for i in range(2, 10):
    print_gugudan(i)
