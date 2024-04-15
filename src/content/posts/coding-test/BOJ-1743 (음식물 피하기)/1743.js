const fs = require("fs")

const [info, ...arr] = fs.readFileSync("./test").toString().trim().split("\n")

const [n, m, k] = info.split(" ").map(v => Number(v))

const road = Array.from({ length: m }, () => Array(n).fill(0))

arr.forEach(a => {
  const [x, y] = a.split(" ").map(v => Number(v))
  road[x][y] = 1
})

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const queue = []

const bfs = (startX, startY) => {
  queue.push([startX, startY])

  while (queue.length) {
    const [x, y] = queue.shift()

    for (let i = 0; i < move.length; i++) {
      const nextX = x + move[i][0]
      const nextY = y + move[i][1]

      if (
        m > nextX &&
        nextX >= 0 &&
        n > nextY &&
        nextY >= 0 &&
        road[x][y] >= 1 &&
        road[nextX][nextY] === 1
      ) {
        road[nextX][nextY] += road[x][y]
        queue.push([nextX, nextY])
      }
    }
  }
}

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (road[i][j] === 1) {
      bfs(i, j)
    }
  }
}

console.log(Math.max(...road.flat()))
