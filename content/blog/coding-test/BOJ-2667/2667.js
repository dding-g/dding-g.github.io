const fs = require("fs")
const [n, ...arr] = fs.readFileSync("./test").toString().trim().split("\n")

const aptMap = arr.map(v => v.split("").map(z => Number(z)))

const answer = []

const search = (x, y) => {
  if (x < n && y < n && x >= 0 && y >= 0) {
    if (aptMap[x][y] == 1) {
      aptMap[x][y] = 0

      search(x + 1, y)
      search(x, y + 1)
      search(x - 1, y)
      search(x, y - 1)

      return
    }
  }

  return
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (aptMap[i][j] == 1) {
      const prevCnt = aptMap.flat().reduce((a, b) => a + b, 0)
      search(i, j, 0)
      const nextCnt = aptMap.flat().reduce((a, b) => a + b, 0)
      answer.push(prevCnt - nextCnt)
    }
  }
}

console.log(answer.length)
console.log(answer.sort((a, b) => a - b).join("\n"))
