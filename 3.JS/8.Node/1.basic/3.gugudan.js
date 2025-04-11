function gugudan() {
    for (let dan = 2; dan <= 9; dan++) {
        console.log(`=== ${dan}단 ===`);
        for (let i = 1; i <= 9; i++) {
            console.log(`${dan} x ${i} = ${dan*i}`);
        }
    }
}

gugudan();
// 미션1. 구구단을 완성하시오.. 2단, ... 9단까지.
