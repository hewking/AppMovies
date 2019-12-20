const path = require('path');
const fs = require('fs');

// let [, , src = '', dest = ''] = process.argv;

// const cwd = process.cwd();

// src = path.resolve(cwd, src);

// dest = path.resolve(cwd, dest);

// src = '/Users/jianhao/GuildChat2/packages/app-main/src/i18n/en/index.js'
// dest = '/Users/jianhao/GuildChat2/packages/app-main/src/i18n/fr/index.js'


const source = require("/Users/jianhao/GuildChat2/packages/app-main/src/i18n/fr/index.json");


console.log('successful generated sticker resource file from dir: ', src, 'to:', dest,'cwd:',cwd);


const json1 = {
    "key1": 'value1',
    "key2": "value2",
    "key3": "value3",
}

const json2 = {
    "key1": "2value1",
    "key2": "2value2",
}


function difference(a, b) {
    let set1 = new Set(a), set2 = new Set(b);
    return [...new Set([...set1].filter(x => !set2.has(x))), ...new Set([...set2].filter(x => !set1.has(x)))];
}

/**
 * 找出json2 与 json1 的某一个值在另一个集合中没有的值
 */
const check = () => {

    const files = fs.readFile(src, (error,data) => {
        if (error) {
            console.log(error);
        }
        console.log(String(data));
    })

    // const json = require(src);

    console.log(source);

    const json1Keys = Object.keys(json1);
    const json2Keys = Object.keys(json2);

    const diff = difference(json1Keys, json2Keys);

    console.log('json1Keys:', json1Keys, 'json2Keys:', json2Keys,'diff:',diff);

}

check();
