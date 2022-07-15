const fs = require("fs")
const [start, end] = fs.readFileSync("./test").toString().trim().split("\n")

const startNum = Number(start)
const endNum = Number(end)

const decimal = []

const peekDecimal = n => {
  for (let i = 2; i <= parseInt(n / 2); i++) {
    if (n % i === 0) return false
  }

  if (n !== 1) decimal.push(n)
  return true
}

for (let i = startNum; i <= endNum; i++) {
  peekDecimal(i)
}

if (decimal.length > 0) {
  console.log(decimal.reduce((a, b) => a + b, 0))
  console.log(decimal[0])
} else {
  console.log(-1)
}
