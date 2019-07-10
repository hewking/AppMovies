//  getStickers.js
const fs = require('fs');
const path = require('path');
const sticker_dir = '../res/Stickers/Fpeach-resized'
const gen_sticker_file_path = '../res/sticker.js'
const stickerDir = path.resolve(__dirname, sticker_dir);

// 读取单个文件
function readfile(dirPath = stickerDir, filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dirPath, filename), 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(`{
        name: "${filename.slice(0, filename.lastIndexOf('.'))}",
        resource: require("${sticker_dir}/${filename}"),
      }`);
    });
  });
}

// 读取Stickers文件夹下所有image
function readSvgs(dirPath = stickerDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, function (err, files) {
      if (err) reject(err);
      Promise.all(files.filter((file) => !file.endsWith('gif')).map(filename => {
        // let stat = fs.statSync(path.join(dirPath, filename));
        // if (stat.isDirectory()) {
        //   return readSvgs(path.join(dirPath, filename));
        // } else {
        return readfile(dirPath, filename);
        // }
      }))
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  });
}


// 生成js文件
readSvgs()
  .then(data => {
    // let svgFile = 'export default ' + JSON.stringify(Object.assign.apply(this, data));
    let svgFile = `export default ${sticker_dir.slice(sticker_dir.lastIndexOf('/') + 1, sticker_dir.lastIndexOf('-'))}: [ ${data} ]`;
    svgFile.replace("")
    fs.writeFile(path.resolve(__dirname, gen_sticker_file_path), svgFile, function (err) {
      if (err) throw new Error(err);
    });
  }).catch(err => {
    throw new Error(err);
  });