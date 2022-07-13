const fs = require("fs")
const [n, arr] = fs.readFileSync("./test").toString().trim().split("\n")

console.log(
  arr.split(" ").filter(v => {
    const num = parseInt(v)

    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false
    }

    if (num === 1) return false
    return true
  }).length
)
