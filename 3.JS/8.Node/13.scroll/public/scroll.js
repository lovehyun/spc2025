console.log('로딩완료');
// 미션1. 백엔드에 요청해서 데이터를 받아와서, 화면에 랜더링한다.
// 미션1-1. 백엔드에 요청한다. fetch
fetch('/get-items')
// 미션1-2. 데이터를 받아온다. res.xxxxx
    .then((res) => res.json())
    .then((data) => {
// 미션1-3. 화면에 렌더링한다. dom..xxxx
        // console.log(data)
        const myContainer = document.getElementById('scroll-container');
        const item = document.createElement('div');
        item.textContent = data;
        myContainer.appendChild(item);
    });
