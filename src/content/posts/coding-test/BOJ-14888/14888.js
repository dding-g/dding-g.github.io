const fs = require("fs")
const [n, numbers, acc] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split("\n")

// + - x %

const prefix = ["+", "-", "*", "%"]

const numArr = numbers.split(" ").map(v => Number(v))
const accArr = acc.split(" ").map(v => Number(v))

let max = -1000000001
let min = 1000000001

const dfs = (targetIdx, source, operators, opIdx) => {
  const copyOperators = [...operators]

  copyOperators[opIdx] -= 1
  const op = prefix[opIdx]
  let calc = source

  switch (op) {
    case prefix[0]:
      calc += numArr[targetIdx]
      break
    case prefix[1]:
      calc -= numArr[targetIdx]
      break
    case prefix[2]:
      calc *= numArr[targetIdx]
      break
    case prefix[3]:
      calc = parseInt(calc / numArr[targetIdx])
      break
  }

  if (targetIdx === numArr.length - 1) {
    max = Math.max(max, calc)
    min = Math.min(min, calc)

    return
  }

  for (let i = 0; i < 4; i++) {
    if (copyOperators[i] > 0) {
      dfs(targetIdx + 1, calc, copyOperators, i)
    }
  }
}

for (let i = 0; i < 4; i++) {
  if (accArr[i] > 0) dfs(1, numArr[0], accArr, i)
}

if (max === -0) max = 0
if (min === -0) min = 0

console.log(max)
console.log(min)
