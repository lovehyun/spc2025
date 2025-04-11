class MathOps {
    static add(a, b) {
        return a + b;
    }
    static sub(a, b) {
        return a - b;
    }
}

// const myMathOp = new MathOps();
// const result = myMathOp.add(3, 4);
// console.log(result);

// 객체를 이렇게 찍어내지 않고,,, 수학연산을 위한 객체를 만든거라.. 공통함수 제공이 목적임..

const sum = MathOps.add(2, 3);
console.log(sum);
