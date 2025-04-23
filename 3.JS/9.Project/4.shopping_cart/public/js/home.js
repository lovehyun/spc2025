document.addEventListener('DOMContentLoaded', () => {
    // 로그인 한적이 있을까? 물어보기...
    checkLoginStatus();
    document.getElementById('login').addEventListener('click', (e) => {
        e.preventDefault();
        login();
    })
});

async function checkLoginStatus() {
    const response = await fetch('/api/check-login');
    if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        showProfile(data.username);
    } else {
        const data = await response.json();
        console.log(data);
        showLoginForm();
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.status === 200) {
        // 로그인 성공
        const data = await response.json();
        // console.log(data);
        showProfile(data.username);
    } else {
        // 로그인 실패
    }
}

function showProfile(username) {
    document.getElementById('usernameSpan').textContent = username;
    document.getElementById('profile').style.display = 'block';
    document.getElementById('loginFormContainer').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('loginFormContainer').style.display = 'block';
}
