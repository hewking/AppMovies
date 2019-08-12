

let arr = [
    { id: 1, value: 2 },
    { id: 2, value: 3 },
    { id: 8, value: 3 },
]
arr.splice(arr.findIndex(v => v.id === 8), 1);

console.log(arr)

