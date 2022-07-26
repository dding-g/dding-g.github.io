const fs = require("fs")
const [info, ...arrow] = fs.readFileSync("./test").toString().trim().split("\n")

const [n, m, v] = info.split(" ")

const arrowInfo = arrow.reduce((prev, curr) => {
  console.log(curr)
  const [src, target] = curr.split(" ")

  if (prev[src]) {
    prev[src].push(target)
  } else {
    prev[src] = [target]
  }

  return prev
}, {})
console.log(arrowInfo)
const dfsRet = []

const dfsVisit = Array(0).fill(Array(0).fill(Number(n)))

const dfs = target => {
  dfsRet.push(target)
  if (!arrowInfo[target]) return

  for (let i = 0; i < arrowInfo[target].length; i++) {
    dfs[arrowInfo[target][i]]
  }
}

Object.keys(arrowInfo).forEach(val => {
  dfs(val)
})

console.log(dfsRet)
