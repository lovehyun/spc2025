const fs = require('fs');
const http = require('http');

const indexhtml = fs.readFileSync('index.html', 'utf-8');

const server = http.createServer((req, res) => {
    // console.log(res);
    res.writeHead(200);
    res.end(indexhtml);
})

server.listen(3000, () => {
    console.log('Server ready on port 3000');
});
