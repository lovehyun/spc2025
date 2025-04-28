async function logout() {
    const res = await fetch('/api/logout', { method: 'POST'} );
    const data = await res.json();

    if (res.ok) {
        alert(data.message);
    } else {
        alert(data.error);
    }
    window.location.href = '/index.html';
}

function showFlash(message, type='success') {
    const flashDiv = document.getElementById('flash-message');
    flashDiv.innerHTML = `
        <li class="${type}">${message}</li>
    `;
}
