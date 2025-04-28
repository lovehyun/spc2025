async function fetchTweets() {
    const res = await fetch('/api/tweets');
    return await res.json();
}

async function likeTweet(id) {
    console.log(`버튼 클릭, ${id}`);
    const res = await fetch(`/api/like/${id}`, { method: 'POST'});
    const data = await res.json();
    if (!res.ok) {
        alert(data.error);
    } else {
        // alert(data.message);
        // window.location.href ='/index.html' // 화면 깜빡거리게 갱신할거냐..
        renderTweets(); // 조용히 DOM을 새로 그릴거냐...
    }
}

async function unlikeTweet(id) {
    console.log(`버튼 클릭, ${id}`);
    const res = await fetch(`/api/unlike/${id}`, { method: 'POST'});
    const data = await res.json();
    if (!res.ok) {
        alert(data.error);
    } else {
        // alert(data.message);
        // window.location.href ='/index.html' // 화면 깜빡거리게 갱신할거냐..
        renderTweets(); // 조용히 DOM을 새로 그릴거냐...
    }
}

async function renderTweets() {
    const tweets = await fetchTweets();

    const tweetsDiv = document.getElementById('tweets');
    tweetsDiv.innerHTML = '';

    // 여러개의 트윗 배열을 순회하면서 하나하나 그리기...
    tweets.forEach(tweet => {
        const div = document.createElement('div');
        div.className = 'tweet'
        div.innerHTML = `
            <div class="tweet-body-row">
                <p>${tweet.content}</p>
            </div>
            <div class="tweet-author">
                <p>- ${tweet.username} -<p>
            </div>
            <div class="tweet-action">
            ${tweet.liked_by_current_user ? `
                <button onclick="unlikeTweet(${tweet.id})">좋아요 취소</button>
                <p>좋아요수: ${tweet.likes_count}</p>
            ` : `
                <button onclick="likeTweet(${tweet.id})">좋아요</button>
                <p>좋아요수: ${tweet.likes_count}</p>
            `}

            </div>

        `
        tweetsDiv.appendChild(div);
    })
}

document.addEventListener('DOMContentLoaded', renderTweets);