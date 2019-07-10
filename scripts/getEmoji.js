var fs = require('fs');
var path = require('path');

const sticker_dir = '../res/Stickers/Asongsongmeow-resized'
const gen_sticker_file_path = '../res/sticker.js'
const stickerDir = path.resolve(__dirname, sticker_dir);
// const emojiDir = __dirname;

const files = fs.readdirSync(stickerDir);

const outputFile = path.join(__dirname, gen_sticker_file_path);

fs.appendFileSync(`// tslint: disable\n`, 'utf8');

files.forEach(file =>
  fs.appendFileSync(`export const ${file} = require('${file}');`, 'utf8')
);