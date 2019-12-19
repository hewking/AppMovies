/**
 * 艾拉托斯特尼筛法，求n以内质数
 * 
 */

 /**
  * 给定某个数比如100以内质数，通过从2开始
  * 到2的倍数 比如 2，4，6，8，10，12 都不是质数，并且保存这些值。
  * 到100大小数组中，做个标记，例如【1】
  * 并且最小的倍数为2倍，所以 循环 最大为50
  * @param {*} n 
  */
 function pureNumber(n) {
    // let max = n / 2;
    let ans = new Array(n);
    ans.fill(0)
    for (let i = 2;i <= n ; i ++) {
        let j = 2;
        let tmp = i * j;
        while(tmp <= n) {
            ans[tmp - 1] = 1;
            j ++;
            tmp = i * j;
        }
    }
    let res = [];
    ans.forEach((item,index) => {
        if (!item) {
            res.push(index + 1);
        }
    })
    return res;
 }

 console.log(pureNumber(10000000));