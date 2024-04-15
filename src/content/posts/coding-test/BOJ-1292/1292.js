const fs = require("fs")
const [start, end] = fs.readFileSync("./test").toString().trim().split(" ")

const arr = []
let currValue = 1

while (arr.length <= end) {
  for (let i = 0; i < currValue; i++) {
    arr.push(currValue)
  }
  currValue++
}

console.log(arr.slice(start - 1, end).reduce((a, b) => a + b, 0))
