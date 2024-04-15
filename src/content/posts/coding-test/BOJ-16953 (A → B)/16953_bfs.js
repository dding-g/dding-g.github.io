const fs = require("fs")
const [A, B] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const calc = [v => v * 2, v => Number(v + "1")]

const queue = []

let min = Infinity

const bfs = startVal => {
  queue.push({ v: startVal, c: 1 })

  while (queue.length) {
    const { v, c } = queue.shift()

    if (v > B) {
      continue
    }

    if (v === B) {
      min = Math.min(c, min)
    }

    if (v < B) {
      calc.forEach(fn => {
        queue.push({ v: fn(v), c: c + 1 })
      })
    }
  }
}

bfs(A)

console.log(min === Infinity ? -1 : min)
