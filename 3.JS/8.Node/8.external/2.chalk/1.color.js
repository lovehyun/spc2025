// const chalk = require('chalk');

import chalk from 'chalk';

console.log(chalk.green('성공메세지 색상은 초록색으로...'));
console.log(chalk.red('에러가 발생하면 빨간색으로...'));
console.log(chalk.red.bold('에러가 발생하면 빨간색 볼드체로'));
console.log(chalk.bgBlue.white('정보메세지는 파란바탕에 하얀글씨로...'))
console.log(chalk.yellow.underline('경고 메세지에는 노란색, 밑줄도...'))