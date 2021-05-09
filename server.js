/*

  InstaDroid

  --

  @science-math-guy
  copyright 2020-21


*/

// environment variable
require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const puppeteer = require("puppeteer-extra");
const fs = require('fs');


const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

// app.set("trust proxy", true);
// app.use((req, res, next) => {
//   if (!req.secure) return res.redirect("https://" + req.get("host") + req.url);
//   next();
// });

const getScreenshot = async (username) => {
  const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto(`https://instagram.com/`, {
      waitUntil: "networkidle0",
  });

  // await page.waitForSelector('body > div.RnEpo.Yx5HN._4Yzd2 > div > div > button.aOOlW.bIiDR');
  // await page.click('body > div.RnEpo.Yx5HN._4Yzd2 > div > div > button.aOOlW.bIiDR');

  await page.type('#loginForm > div > div:nth-child(1) > div > label > input', process.env.INSTAGRAM_USERNAME);
  await page.type('#loginForm > div > div:nth-child(2) > div > label > input', process.env.INSTAGRAM_PASSWORD);

  await page.waitFor(200);
  await page.click('#loginForm > div > div:nth-child(3) > button > div');
  await page.waitForNavigation();

  await page.waitForSelector('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > div.pbgfb.Di7vw > div');

  await page.goto(`https://instagram.com/${username}/`);

  await page.waitFor(300);

  await page.screenshot({ path: `${__dirname}/public/assets/test.png` });
  await browser.close();
};

let image = false;

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('home', {
    image: image
  });
  image = false;
});

app.post('/api/test', async (req, res)=> {
  let username = req.body.username;
  await getScreenshot(username);
  console.log('done');
  image = true;
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PORT:${PORT} - server listening`);
});


