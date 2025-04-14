const http = require('http');

const server = http.createServer(); // 서버 생성

server.on('request', (req, res) => {
    console.log('요청이 왔음');
    res.writeHead(200);
    res.end('Hello');
});

server.on('connection', () => {
    console.log('연결이 되었음');

});

server.on('close', () => {
    console.log('연결이 종료되었음');
});

server.listen(3000); // 서버 실행?? 서버 대기.. 
