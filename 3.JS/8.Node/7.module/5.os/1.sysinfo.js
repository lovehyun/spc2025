const os = require('os')

console.log('호스트이름: ', os.hostname());

console.log('임시폴더경로: ', os.tmpdir());

console.log('CPU정보: ', os.cpus());

console.log('메모리양: ', os.totalmem());

const mem_in_gb = os.totalmem() / 1024 / 1024 / 1024;
console.log(`메모리양: ${mem_in_gb}`);

console.log(os.platform());
console.log(os.version());
console.log(os.release());
