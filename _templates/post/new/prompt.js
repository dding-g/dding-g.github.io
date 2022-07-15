// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const fs = require("fs")
const dir = fs.readdirSync("content/blog", { withFileTypes: true })

const directories = dir.filter(d => d.isDirectory()).map(d => d.name)

module.exports = {
  prompt: ({ prompter, args }) =>
    prompter
      .select({
        type: "input",
        name: "category",
        message: "카테고리를 선택하세요.",
        choices: directories,
      })
      .then(category =>
        prompter
          .prompt({
            type: "input",
            name: "title",
            message: `타이틀`,
          })
          .then(({ title }) => ({ title, category }))
      ),
}
