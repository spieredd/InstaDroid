const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");
const ora = require("ora");
const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const likePosts = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto(`https://instagram.com/`, {
    waitUntil: "networkidle0",
  });

  await page.type(
    "#loginForm > div > div:nth-child(1) > div > label > input",
    process.env.INSTAGRAM_USERNAME
  );
  await page.type(
    "#loginForm > div > div:nth-child(2) > div > label > input",
    process.env.INSTAGRAM_PASSWORD
  );

  await page.waitFor(200);
  await page.click("#loginForm > div > div:nth-child(3) > button > div");
  await page.waitForNavigation();

  await page.waitForSelector(
    "#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > div.pbgfb.Di7vw > div"
  );

  await page.goto(`https://instagram.com/${process.env.INSTAGRAM_USERNAME}/`);

  await page.waitFor(300);

  await page.screenshot({ path: `${__dirname}/public/assets/test.png` });
  await browser.close();
};

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
    if (answers.action === "Like posts") {
      likePosts();
    } else {
      console.log('Follow suggested accounts');
    }
  });
