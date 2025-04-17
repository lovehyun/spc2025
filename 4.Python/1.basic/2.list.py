my_list = [1, 2, 3, 4, 5]

print(my_list)
print(len(my_list))

# 인덱싱
print("[0]:", my_list[0])
print("[4]:", my_list[4])
print("[-1]:", my_list[-1])
print("[-3]:", my_list[-3])
print("[-5]:", my_list[-5])

# 배열의 인덱스 범위는.. -len 부터 len-1 까지 가능함

# 슬라이싱
print("[1:3]:", my_list[1:3]) # 인덱스1은 포함하고, 인덱스3은 포함하지 않는다
print("[:3]:", my_list[:3])
print("[3:]:", my_list[3:])

# 리스트 추가..
my_list.append(6)
print(my_list)

my_list.insert(2, 99)  # 2번째 위치...
print(my_list)

my_list.remove(99)  # 특정 요소(element) 를 삭제
print(my_list)

popped_element = my_list.pop(3) # 3번째 인덱스의 요소를 빼내라..
print("뽑아낸것: ", popped_element)
print("남은리스트: ", my_list)

popped_element = my_list.pop() # 인덱스를 안주면, 맨 뒤에 요소
print("뽑아낸것: ", popped_element)
print("남은리스트: ", my_list)

# 리스트 컴프리헨션
numbers = [x for x in range(10)] # 맨 앞의 변수(가칭:선택자)로 이 리스트의 요소를 채울거다.
                                 # 뒤에가 x 가 만들어 지는 조건...
print(numbers)

numbers = [x for x in range(1,5)]
print(numbers)

numbers = [x**2 for x in range(10)] 
print(numbers)

numbers = [x for x in range(10) if x % 2 == 0] # 짝수만 남기기...
print(numbers)

numbers = [x for x in range(10) if x % 2 == 1] # 홀수만 남기기...
print(numbers)
