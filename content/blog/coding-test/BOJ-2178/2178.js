const fs = require("fs")
const [info, ...miro] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")

const miroArr = miro.map(m => m.split("").map(v => Number(v)))
const [n, m] = info.split(" ").map(v => Number(v))

const check = Array.from({ length: n }, () => Array(m).fill(0))

const bfs = (startX, startY) => {
  const queue = []

  const move = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]

  queue.push([startX, startY])
  check[startX][startY] = 1

  while (queue.length) {
    const [x, y] = queue.shift()

    for (let i = 0; i < move.length; i++) {
      const nextX = x + move[i][0]
      const nextY = y + move[i][1]

      if (
        0 <= nextX &&
        nextX < n &&
        0 <= nextY &&
        nextY < m &&
        miroArr[nextX][nextY] === 1 &&
        check[nextX][nextY] === 0
      ) {
        check[nextX][nextY] += check[x][y] + 1
        queue.push([nextX, nextY])
      }
    }
  }
}

bfs(0, 0)

console.log(check[n - 1][m - 1])
