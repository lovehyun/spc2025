console.log('로딩완료');
// 미션1. 백엔드에 요청해서 데이터를 받아와서, 화면에 랜더링한다.
async function loading() {
    // 미션1-1. 백엔드에 요청한다. fetch
    const res = await fetch('/get-items')
    // 미션1-2. 데이터를 받아온다. res.xxxxx
    const data = await res.json();
    // 미션1-3. 화면에 렌더링한다. dom..xxxx
    const myContainer = document.getElementById('scroll-container');
    
    // 미션1-4. data를 각 항목(item)별로 개별 div로 만들기...
    data.forEach((d) => {
        const item = document.createElement('div');
        item.textContent = d;
        item.classList.add('item'); // 디자인 속성 추가
        myContainer.appendChild(item);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loading();
});
