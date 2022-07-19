const fs = require("fs")
const [input, ...arr] = fs.readFileSync("./test").toString().trim().split("\n")

const prefix = ["a", "n", "t", "i", "c"]
const [n, k] = input.split(" ")

// antic 이 5글자 이므로 최소 5글자 이상 배울 수 있어야 하나의 단어를 읽을 수 있음
if (k <= prefix.length) {
  console.log(0)
  return
}

// 배움이 필요한 단어들
const words = new Set(prefix)

// 중복처리
arr.forEach(v => {
  if (!words.has(v)) {
    new Set(v).forEach(sv => words.add(sv))
  }
})

// 모두 배울 수 있으면 전체 단어 개수 return
if (words.length + prefix.length <= k) {
  console.log(arr.length)
  return
}

let count = []
const countReadableWords = p =>
  arr.reduce((prev, curr) => {
    if (Array.from(new Set(prev)).every(v => words.has(v))) {
      curr += 1
    }

    return curr
  }, 0)

const arrWords = Array.from(words)

const dfs = (learned, idx) => {
  if (learned.length === k - prefix.length) {
    count.push(countReadableWords(learned))
    dfs(learned.slice(0, learned.length - 1), idx - 1)
    return
  }

  dfs(learned + arrWords[idx], idx + 1)
}
