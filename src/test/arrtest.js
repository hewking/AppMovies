

let arr = [
    { id: 1, value: 2 },
    { id: 2, value: 3 },
    { id: 8, value: 3 },
]
arr.splice(arr.findIndex(v => v.id === 8), 1);

// console.log(arr)


let arr2 = arr;
let arr3 = [1,2];

// console.log(arr.indexOf(arr2));

let arr4 = [1,2,3]
let arr5 = [4,5]

var tempArr = []

tempArr.push(...arr5)
tempArr = arr4.concat(tempArr)
// arr4.forEach(item => {
//     tempArr.unshift(item)
// })



const jsonObj = JSON.parse('');

console.log(tempArr);
console.log(jsonObj);