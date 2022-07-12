// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const fs = require("fs")
const dir = fs.readdirSync("content/blog", { withFileTypes: true })

const directories = dir.filter(d => d.isDirectory()).map(d => d.name)

module.exports = [
  {
    type: "input",
    name: "path",
    message: `글 경로. 아래 중 골라주세요.\n${directories.join(", ")} : `,
  },
  {
    type: "input",
    name: "title",
    message: `타이틀`,
  },
]
