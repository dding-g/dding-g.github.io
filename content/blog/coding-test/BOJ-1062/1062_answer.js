const fs = require("fs")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n")

;(function solution(input) {
  const [n, k] = input[0].split(" ").map(Number)

  if (k < 5) {
    console.log(0)
    return
  } else if (k === 26) {
    console.log(n)
    return
  }

  const words = input.slice(1).map(word => {
    let check = 0
    for (let i = 0; i < word.length; i++) {
      check |= 1 << (word.charCodeAt(i) - 97)
    }
    return check
  })

  let learned = 0
  const required = "antatica"
  for (let i = 0; i < required.length; i++) {
    learned |= 1 << (required.charCodeAt(i) - 97)
  }
  const learnings = k - 5
  let maxLearnedWords = 0

  dfs(0, 0)

  console.log(maxLearnedWords)

  function dfs(cnt, start) {
    if (cnt >= learnings) {
      let learnedWords = 0
      words.forEach(word => {
        if ((word & learned) === word) learnedWords++
      })
      maxLearnedWords = Math.max(maxLearnedWords, learnedWords)
      return
    }

    for (let i = start; i < 26; i++) {
      if (!(learned & (1 << i))) {
        learned |= 1 << i
        dfs(cnt + 1, i + 1)
        learned ^= 1 << i
      }
    }
  }
})(input)
