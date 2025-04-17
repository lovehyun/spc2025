x = 5
y = "Hello"
z = [1,2,3]

print(type(x))
print(type(y))
print(type(z))

print("x는 숫자냐?", isinstance(x, int))
print("x는 글자냐?", isinstance(x, str))
print("y는 글자냐?", isinstance(y, str))

class A:
    pass

class B(A):   # B라는 객체는 A를 상속받는다. class B extends A
    pass

class C:
    pass

b = B()  # 객체를 실체화.. instantiation

print(isinstance(b, A))   # 맞음
print(isinstance(b, B))   # 맞음
print(isinstance(b, C))   # 틀림

a = A()
print(isinstance(a, A))   # 맞음
print(isinstance(a, B))   # 틀림
print(isinstance(a, C))   # 틀림
