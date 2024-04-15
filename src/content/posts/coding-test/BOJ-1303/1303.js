const fs = require("fs")
const [info, ...war] = fs.readFileSync("./test").toString().trim().split("\n")

const [n, m] = info.split(" ").map(v => Number(v))
const army = war.map(w => w.split(""))

const visits = Array(n).fill(Array(m).fill(0))

const move = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const power = {
  W: 0,
  B: 0,
}

let cnt = 0

const dfs = (x, y, target) => {
  visits[x][y] = 1
  cnt += 1

  for (let i = 0; i < move.length; i++) {
    const nextX = move[i][0] + x
    const nextY = move[i][1] + y

    if (
      nextX >= 0 &&
      nextY >= 0 &&
      nextX < n &&
      nextY < m &&
      visits[nextX][nextY] === 0 &&
      target === army[nextX][nextY]
    ) {
      dfs(nextX, nextY, target)
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (visits[i][j] === 0) {
      cnt = 0
      visits[i][j] = 1
      dfs(i, j, army[i][j])
      console.log(cnt)
      power[army[i][j]] += cnt * cnt
    }
  }
}

console.log(power)
