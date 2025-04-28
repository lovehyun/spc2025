const tweetBtn = document.getElementById('tweetBtn');

tweetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const content = document.getElementById('content').value;

    if (!content.trim()) {
        alert('내용을 입력하세요');
        return;
    }

    fetch('/api/tweet', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({content})
    })

    // TODO: 응답값 확인
});
