// 미션1-1. 저 영역을 클리해서 창이 나오게 한다.
// 미션1-2. X박스를 눌러서 다시 창이 닫히게 한다.

// 미션3. Send 버튼을 통해서... 백엔드로 사용자가 입력한 대화 내용을 전송한다.
// 미션3-2. 엔터로도 입력되게...
// 미션4. 받아온 응답(에코 메세지)을 대화창에 출력한다.
// 미션4-2. 내가 입력한 메세지도 대화창에 출력하기... (가 있는게, 더 채팅창이 보기가 좋음)

const API_SERVER = 'http://127.0.0.1:3000'

function createChatbotUI() {
    const chatbotHTML = `
    <div class="chatbot-icon" id="chatbotIcon">
        <!-- 아이콘 -->
        <i class="bi bi-chat-dots"></i>
        <!-- <i class="bi bi-snapchat"></i> -->
        <!-- <i class="bi bi-telegram"></i> -->
    </div>
    <div class="chatbot-window" id="chatbotWindow">
        <!-- 창 -->
        <div class="chatbot-header">
            <span>Chatbot</span>
            <button id="closeChatbot">X</button>
        </div>
        <div class="chatbot-body">
            <div class="chatbot-messages" id="chatbotMessage"></div>
            <div class="chatbot-input-container">
                <input type="text" id="chatbotInput" placeholder="메세지를 입력하시오.">
                <button id="sendMessage">Send</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

document.addEventListener('DOMContentLoaded', () => {
    createChatbotUI();

    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendMessage = document.getElementById('sendMessage');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessage');

    chatbotIcon.addEventListener('click', () => {
        chatbotIcon.style.display = 'none';
        chatbotWindow.style.display = 'flex';
    });

    closeChatbot.addEventListener('click', () => {
        chatbotIcon.style.display = 'flex';
        chatbotWindow.style.display = 'none';
    });

    sendMessage.addEventListener('click', () => {
        getInputFromYourSendMessage();
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // console.log('엔터키눌렸으니, 서버로 보내는 코드 짜기 TODO');
            getInputFromYourSendMessage();
        }
    });

        
function addMessage(message, sender = 'user') {
    // message 내의 **을 감싸고 있는 텍스트를 <strong> 태그로 변환한다.
    // 아래 이런 부분들은 바이브코딩으로 바꿔보기.. "줄바꿈", "강조" 등의 정규표현식을 자동화 도구로 어떻게 생성해서 코드에 반영할지 해보기.
    const formattedMessage = message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>'); // \n을 <br>로 변환한다.
        // 화면에 메세지를 추가한다.
        const myMessage = document.createElement('div');
        myMessage.innerHTML = sender + ": " + formattedMessage;
        chatbotMessages.appendChild(myMessage);

        // 스크롤을 내린다.
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // 그래서.... 이 아래 함수를 잘게 나누기.... TODO
    async function getInputFromYourSendMessage() {
        const question = chatbotInput.value;
        
        // 메세지 지우기
        chatbotInput.value = '';
        addMessage(question, 'user');

        // 서버로 보낸다
        const resp = await fetch(`${API_SERVER}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question }),
        });

        const result = await resp.json();    

        addMessage(result.answer, 'chatbot');

        // 주의: 다른 모듈의 함수 호출해서 갱신하기.
        renderTodos();
    }

});
