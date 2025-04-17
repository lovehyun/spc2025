# 튜플
# 리스트는 [] 대괄호, 튜플은 () 소괄호, 딕셔너리는 {} 중괄호

my_tuple = (1,2,3,4,5)
print(len(my_tuple))
print(my_tuple[0])
print(my_tuple[-1])

# 모든 기능이 다 리스트와 동일함, 단 수정 불가

# my_tuple[2] = 3 # 변경 시도시 오류 발생

# 튜플 언패킹(unpacking): 요소를 분할해서 가져오는것..
a, b, c, d, e = my_tuple
print(a)
print(b)
print(c)
print(d)
print(e)

# function add(a, b) {
#     return a + b
# }

def add(a, b):
    return a + b

print("합산: ", add(a, b))

def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

stats = get_stats([1,2,3,4,5])
print(stats)
