const fs = require("fs")
const [n, ...mapPipe] = fs.readFileSync("./test").toString().trim().split("\n")

const arrMap = mapPipe.map(m => m.split(" "))
const target = Number(n)

const prefix = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
]

let count = 0

const search = point => {
  if (point.x == target - 2 && point.y == target - 2) {
    count++
    return
  }

  for (let i = 0; i < prefix.length; i++) {
    const nextX = point.x + prefix[i].x
    const nextY = point.y + prefix[i].y
    if (
      nextX < target &&
      nextY < target &&
      arrMap[nextX][nextY] != 1 &&
      arrMap[nextX][nextY] != 2
    ) {
      if (
        (prefix[i].x === 1 &&
          prefix[i].y === 1 &&
          (arrMap[nextX][nextY - 1] == 1 || arrMap[nextX][nextY - 1] == 2)) ||
        arrMap[nextX - 1]?.[nextY] == 1 ||
        arrMap[nextX - 1]?.[nextY] == 2
      ) {
        continue
      }

      arrMap[nextX][nextY] = 2
      search({ x: nextX, y: nextY })
      arrMap[nextX][nextY] = 0
    }
  }

  return
}

search({ x: 0, y: 0 })

console.log(count)
