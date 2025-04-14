import chalk from 'chalk';
import figlet from 'figlet';

figlet('Hello World!', (err, data) => {
    if (err) {
        console.error('에러', err);
        return;
    }

    console.log(chalk.cyan(data));
    console.log()
    console.log(chalk.bgYellow.greenBright(data));
});
