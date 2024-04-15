const fs = require("fs")
const [n, k] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const move = [v => v - 1, v => v + 1, v => v * 2]

const tick = []

const queue = []

function bfs(startVal) {
  move.forEach(fn => {
    queue.push({ v: fn(startVal), t: 1 })
  })

  while (queue.length) {
    const { v, t } = queue.shift()

    for (const fn of move) {
      const next = fn(v)

      if (next === k) {
        tick.push(t + 1)
      } else if (next > 0 && next - 1 <= k && next <= 100000) {
        if (tick.length > 0 && Math.min(...tick) < t) continue
        queue.push({ v: next, t: t + 1 })
      }
    }
  }
}

bfs(n)

const min = Math.min(...tick)
const minCount = tick.filter(t => t === min).length

console.log(min)
console.log(minCount)
