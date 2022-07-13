// https://www.acmicpc.net/problem/2460

const fs = require("fs")
const stations = fs.readFileSync("/dev/stdin").toString().trim().split("\n")

let cnt = 0
let maxCnt = 0

stations.forEach(station => {
  const [out, on] = station.split(" ")

  cnt += on - out

  if (cnt > maxCnt) {
    maxCnt = cnt
  }
})

console.log(maxCnt)
