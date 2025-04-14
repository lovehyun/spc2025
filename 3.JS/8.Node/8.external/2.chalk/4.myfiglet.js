// 이런 아스키아트를 내가 직접 만든다면??
// 라이브러리를 안쓰고, 내손으로 만든다면??

const asciiFont = {
    H: [
        '   ',
        '|_|',
        '| |',
    ],
    E: [
        ' __',
        '|__',
        '|__',
    ],
    L: [
        '   ',
        '|  ',
        '|__',
    ],
    O: [
        ' _ ',
        '| |',
        '|_|',
    ]
}

function printAsciiArt(text) {
    const chars = text.toUpperCase().split('');

    for (let line = 0; line < 3; line++) {
        let output = '';
        for (const ch of chars) {
            output += (asciiFont[ch] ? asciiFont[ch][line] : '   ') + ' ';
        }
        console.log(output);
    }
}

printAsciiArt('hello')
