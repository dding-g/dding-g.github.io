// https://www.acmicpc.net/problem/10870

const fs = require("fs")
const cnt = Number(fs.readFileSync("./test").toString())

const pibo = [0, 1]

for (let i = 2; i <= cnt; i += 1) {
  pibo.push(pibo[i - 2] + pibo[i - 1])
}

console.log(pibo[cnt])
