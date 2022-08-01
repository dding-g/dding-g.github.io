const fs = require("fs")
const [t, ...arr] = fs
  .readFileSync("./test")
  .toString()
  .trim()
  .split("\n")
  .map(v => Number(v))

const answer = Array(t).fill(1) // 모든게 1인 경우 하나는 기본.

for (let i = 0; i < t; i++) {
  const 몫 = parseInt(arr[i] / 2)
  const 나머지 = arr[i] % 2

  answer[i] += 몫
}

console.log(answer)

for (let i = 0; i < t; i++) {
  const 몫 = parseInt(arr[i] / 3)
  const 나머지 = arr[i] % 3

  answer[i] += 몫 + 나머지
}

console.log(answer)
