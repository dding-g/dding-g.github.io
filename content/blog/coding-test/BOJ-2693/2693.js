const fs = require("fs")
const [num, ...arr] = fs.readFileSync("./test").toString().trim().split("\n")

for (let i = 0; i < num; i++) {
  const temp = arr[i].split(" ").sort((a, b) => a - b)
  console.log(temp[temp.length - 3])
}
