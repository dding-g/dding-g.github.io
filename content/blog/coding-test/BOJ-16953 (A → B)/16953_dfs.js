const fs = require("fs")
const [A, B] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split(" ")
  .map(v => Number(v))

const calc = [v => v * 2, v => Number(v + "1")]

let min = Infinity

const dfs = (val, cnt) => {
  if (val > B) return
  if (val === B) {
    min = Math.min(min, cnt)
    return
  }

  calc.forEach(fn => {
    dfs(fn(val), cnt + 1)
  })
}

dfs(A, 1)

console.log(min === Infinity ? -1 : min)
