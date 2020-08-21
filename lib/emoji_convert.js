const emojiData = require('emoji-datasource');
let emojiMap;

exports.init = () => {
    const decodeUni16 = str => {
        return str.split('-').reduce((acc, x) => acc + String.fromCodePoint(parseInt(x, 16)), '');
    }

    emojiMap = emojiData.reduce((acc, emoji) => {
        const decoded = unescape(decodeUni16(emoji.unified));
        return { ...acc, [emoji.short_name]: decoded };
    }, {})
}


exports.convertEmojiString = str => {
    const splitEmoji = str => {
        const reg = /(:\w+:)/;
        return str.split(reg);
    };
    const arr = splitEmoji(str);
    const decoded = arr.reduce((acc, x) => {
        const emojiName = (x[0] === ':' && x[x.length - 1] === ':') ? x.slice(1, -1) : '';
        return `${acc}${(emojiName in emojiMap) ? emojiMap[emojiName] : x}`;
    }, '');
    return decoded;
}
