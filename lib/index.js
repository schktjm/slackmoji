const emojiConvert = require('./emoji_convert');
emojiConvert.init();

module.exports = () => {

    const [, , firstArg] = process.argv;
    if (!firstArg) {
        console.error("文字列を入力してね");
        process.exit(1);
    }

    const str = emojiConvert.convertEmojiString(firstArg);
    console.log(str);
}

