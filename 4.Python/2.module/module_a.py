def function_a1():
    print('module_a: function_a1 호출됨')
    function_a2()
    
def function_a2():
    print('module_a: function_a2 호출됨')
    function_a3()
    
def function_a3():
    print('module_a: function_a3 호출됨')
    function_hello()
    
def function_hello():
    print('module_a: function_hello 호출됨')
    function_goodbye()
    
def function_goodbye():
    print('module_a: function_goodbye 호출됨')
    raise RuntimeError("의도적으로 에러발생하기")

def function_b1(value):
    print('module_a: function_b1 호출됨')
    function_b2(value)
    
def function_b2(value):
    print('module_a: function_b2 호출됨')
    function_b3(value)
    
def function_b3(value):
    print('module_a: function_b3 호출됨')
    wrong_value = str(value)
    result = wrong_value * "x"
    print("최종 결과 계산: ", result)
    
if __name__ == '__main__':
    print('moudule_a의 메인함수')
