const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const ora = require("ora");

clear();

console.log(
  figlet.textSync("InstaDroid", {
    font: "big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 200,
    whitespaceBreak: true,
  })
);

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "InstaDroid is waiting for your orders:",
      choices: ["Like posts", "Follow suggested accounts"],
    },
  ])
  .then((answers) => {
    console.log(chalk.underline.cyan(`Action: ${answers.action}`));
      const spinner = ora("Bot running").start();
  });
