document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const userTable = document.getElementById('userTable');

    // 최초 페이지가 호출될때, 백엔드에 데이터 요청.
    updateTable();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = username.value;
        
        console.log('생성할 이름: ', name);
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        })
        
        username.value = ''; // 입력칸 비우기
        updateTable();
    })

    // 버튼을 만들고, 콜백함수 등록하는 함수를 만드는중...
    function createButton(text, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text
        button.addEventListener('click', clickHandler);
        return button;
    }

    function updateTable() {
        userTable.innerHTML = ''; // 이전 내용 삭제

        fetch('/users')
            .then(res => res.json())
            .then(users => {
                // console.log(users);
                for (const key in users) {
                    const row = document.createElement('div');
                    row.innerHTML = `
                        <strong>ID:</strong> ${key},
                        <strong>Name:</strong> ${users[key]}
                    `

                    // 버튼 만들기 함수 호출
                    row.appendChild(createButton('수정', () => editUser(key)));
                    row.appendChild(createButton('삭제', () => deleteUser(key)));

                    userTable.appendChild(row);
                }
            })
    }

    function editUser(userId) {
        const newName = prompt('수정할 이름을 입력하세요.');
        // 코드를 구현해볼것... PUT 을 어떻게 부를것인가??
    }

    function deleteUser(userId) {
        fetch(`/users/${userId}`, {
            method: 'DELETE'
        });
        updateTable();
    }

    // 미션1. 입력이 끝났으면, 입력칸 클리어 하기
    // 미션2. 입력이 끝났으면, 서버에 정보를 요청해서 화면에 표시하기

    // 미션3. 사용자 목록에 "수정", "삭제" 버튼 추가하기

    // 미션4. "삭제" 기능 구현
    // 미션5. "수정" 기능 구현
});
