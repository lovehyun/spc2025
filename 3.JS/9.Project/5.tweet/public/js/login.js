const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    });

    if (res.ok) { // res.status_code == 200 인걸 비교하거나, res.ok 가 true/false 라서 이걸 비교하거나..
        const data = await res.json();
        showFlash(data.message, 'success');
        setTimeout(() => {
            window.location.href ='/index.html'
        }, 1000); // 1초 있다가 메인으로 이동
    } else {
        const data = await res.json();
        showFlash(data.error, 'danger');
        setTimeout(() => {
            window.location.href ='/login.html'
        }, 1000); // 1초 있다가 다시 로그인 페이지로 이동
    }

});

function showFlash(message, type='success') {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.innerHTML = `
        <li class="${type}">${message}</li>
    `;
}
