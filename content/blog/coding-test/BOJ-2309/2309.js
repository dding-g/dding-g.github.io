const fs = require("fs")
const tall = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split("\n")
  .map(v => parseInt(v))

const sumTall = tall.reduce((t, n) => t + n, 0)
const diffTall = sumTall - 100

let answer = []

for (let i = 0; i < tall.length - 1; i += 1) {
  for (let j = i + 1; j < tall.length; j += 1) {
    const isDiff = tall[i] + tall[j] === diffTall

    if (isDiff) {
      answer = tall.filter(t => t !== tall[i] && t !== tall[j])
    }
  }
}

console.log(answer.sort((a, b) => a - b).join("\n"))
