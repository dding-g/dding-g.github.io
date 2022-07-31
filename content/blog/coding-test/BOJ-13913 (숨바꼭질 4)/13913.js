const fs = require("fs")
const [n, k] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const queue = []
const move = [v => v + 1, v => v - 1, v => v * 2]
const visits = Array(100002).fill(null)

const bfs = startVal => {
  queue.push(startVal)
  visits[startVal] = startVal

  while (queue.length) {
    const v = queue.shift()
    if (k === v) return

    for (const fn of move) {
      const nextVal = fn(v)

      if (
        nextVal !== 0 &&
        nextVal >= 0 &&
        nextVal <= 100000 &&
        !visits[nextVal]
      ) {
        // 직전 방문 노드를 저장하고 마지막에 거꾸로 탐색해서 log 추출
        visits[nextVal] = v
        queue.push(nextVal)
      }
    }
  }
}

bfs(n)

let prev = visits[k]
const route = [k, visits[k]]
const temp = Array(100002).fill(0)

while (temp[prev] !== 1 && prev !== n) {
  route.push(visits[prev])
  prev = visits[prev]
  temp[prev] = 1
}

console.log(route)
console.log(route.length - 1)
console.log(route.reverse().join(" "))
