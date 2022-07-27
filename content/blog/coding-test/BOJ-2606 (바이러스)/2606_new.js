const fs = require("fs")
const [computerNum, graphNum, ...graphs] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split("\n")

// 딕셔너리화
// { 1 : [...], 3: [...], ...}
const dicGraph = graphs.reduce((obj, curr) => {
  const [src, target] = curr.split(" ").map(g => Number(g))

  if (obj[src]) {
    obj[src].push(target)
  } else {
    obj[src] = [target]
  }

  if (obj[target]) {
    obj[target].push(src)
  } else {
    obj[target] = [src]
  }

  return obj
}, {})

const count = new Set([])

// dfs 탐색
const dfs = target => {
  if (!Array.isArray(dicGraph[target])) {
    return
  }

  //  연결된 node가 탐색하지 않은 노드면 dfs 시작
  for (let i = 0; i < dicGraph[target].length; i++) {
    if (!count.has(dicGraph[target][i]) && dicGraph[target][i] != 1) {
      count.add(dicGraph[target][i])
      dfs(dicGraph[target][i])
    }
  }
}

dfs(1)

console.log(count.size)
