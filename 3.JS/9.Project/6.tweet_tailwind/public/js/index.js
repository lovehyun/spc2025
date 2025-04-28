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
        div.className = 'bg-white p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 mb-4';

        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <p class="text-lg font-semibold">${tweet.content}</p>
                ${tweet.user_id ? `
                    <form onsubmit="event.preventDefault(); deleteTweet(${tweet.id});" class="ml-2">
                        <button type="submit" class="text-red-500 hover:text-red-700 text-xl">×</button>
                    </form>
                ` : ''}
            </div>

            <p class="text-sm text-gray-500 mb-4">- ${tweet.username} -</p>
            
            <div class="flex justify-between items-center">
                ${tweet.liked_by_current_user ? `
                    <button onclick="unlikeTweet(${tweet.id})" class="text-blue-500 hover:underline">Unlike</button>
                ` : `
                    <button onclick="likeTweet(${tweet.id})" class="text-gray-500 hover:underline">Like</button>
                `}
                <span class="text-sm text-gray-600">Likes: ${tweet.likes_count}</span>
            </div>
        `;

        tweetsDiv.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', renderTweets);