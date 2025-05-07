document.addEventListener("DOMContentLoaded", async function() {
    // 기본 채팅 윈도우용 DOM
    const userInputForm = document.getElementById("user-input-form");
    const userInputField = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");
    // 세션 관리용 DOM
    const sessionListContainer = document.getElementById('session-list-container');
    const currentSessionId = document.getElementById('current-session-id');

    userInputForm.addEventListener("submit", function(event) {
        event.preventDefault();
        submitUserInput();
    });

    async function submitUserInput() {
        const userInput = userInputField.value;
        const sessionId = currentSessionId.textContent;

        // Display user input in chat container
        displayMessage(userInput, "user");
        showLoadingIndicator();

        try {
            // Send user message to /api/chat
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, userInput })
            });

            hideLoadingIndicator();
            const data = await response.json();
            
            // Display chatbot response
            if (data.message) {
                displayMessage(data.message, "chatbot");
            } else {
                displayMessage("No response from chatbot.", "chatbot");
            }
        } catch (error) {
            console.error('Error:', error);
            displayMessage("Error communicating with chatbot.", "chatbot");
        }

        // Clear the input field
        userInputField.value = '';
    };

    function displayMessage(message, sender) {
        const messageElement = document.createElement("p");
        messageElement.className = `chat-message ${sender}`
        messageElement.textContent = `${message}`;
        chatContainer.appendChild(messageElement);
        scrollToBottom();
    }

    let loadingMessageDiv = null;

    function showLoadingIndicator() {
        loadingMessageDiv = document.createElement('div');
        loadingMessageDiv.className = 'chat-message chatbot';
        loadingMessageDiv.innerHTML = `
            <div class="message-content">
                <span class="loading-dots"></span> 생각 중...
            </div>
        `;
        chatContainer.appendChild(loadingMessageDiv);
        scrollToBottom();
    }

    function hideLoadingIndicator() {
        if (loadingMessageDiv) {
            loadingMessageDiv.remove();
            loadingMessageDiv = null;
        }
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function appendSession(session) {
        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'session-item';
        sessionDiv.innerHTML = `
            <a href="#" class="session-link" data-session-id="${session.id}">
            <div class="session-id">${session.id}</div>
            <div class="session-start-time">${session.start_time}</div>
            </a>
        `
        sessionListContainer.appendChild(sessionDiv);
    }

    // 세션을 클릭해서 어디로 갈지... 해당 세션의 이전 대화 내용 불러오기
    function addSessionClickListeners() {
        const sessionLinks = document.querySelectorAll('.session-link');
        sessionLinks.forEach(link => {
            link.addEventListener('click', async (event) => {
                event.preventDefault();
                const sessionId = link.dataset.sessionId;
                if (sessionId === currentSessionId.textContent) return; // 현재 이미 해당 세션이면 불러오지 않음.
                await showSession(sessionId);
            })
        })
    }

    // 특정 세션 불러오기
    async function showSession(sessionId) {
        const response = await fetch(`/api/session/${sessionId}`);
        const data = await response.json();
        chatContainer.innerHTML = '';
        console.log(data);
        // 새로운 대화 내용 화면에 그리기
        data.conversationHistory.forEach(item => {
            displayMessage(item.content, item.role);
        })

        displaySessionInfo(data);
    };

    async function loadAllSessions() {
        const response = await fetch('/api/all-sessions');
        const data = await response.json();
        sessionListContainer.innerHTML = '';
        data.allSessions.forEach(appendSession);
        addSessionClickListeners();
    }

    // 새 새션 만들기
    const newChatButton = document.getElementById('new-chat-button');
    newChatButton.addEventListener('click', async function() {
        const response = await fetch('/api/new-session', { method: 'POST' });
        const data = await response.json();
        if (data.success) {
            // 화면에 다시 갱신하기.
            loadAllSessions();
        }
    })

    function displaySessionInfo(sessionData) {
        currentSessionId.textContent = sessionData.id;
    };

    async function loadChatHistoryAndSession() {
        const response = await fetch('/api/current-session');
        const data = await response.json();

        console.log(data);
        // data.conversationHistory.forEach(appendMessage);

        displaySessionInfo(data); // 최근(현재세션) 정보를 표시하기
    }

    // 시작할때 세션 목록 호출
    await loadAllSessions();
    // 시작할때 현재 세션 대화 내용 호출
    await loadChatHistoryAndSession();
});
