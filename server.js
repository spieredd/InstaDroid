require('dotenv').config();

const nodemailer = require('nodemailer');

const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const MinmaxPlugin = require('puppeteer-extra-plugin-minmax')();
puppeteer.use(MinmaxPlugin);

const AnonymizeuaPlugin = require('puppeteer-extra-plugin-anonymize-ua')();
puppeteer.use(AnonymizeuaPlugin);


const proxies = {
  'useragent1': 'http://user:pass@85.237.57.198:44959',
  'useragent2': 'http://user:pass@116.0.2.94:43379',
  'useragent3': 'http://user:pass@186.86.247.169:39168',
};

(async() => {

  console.log('Starting new process...')

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  await page.minimize();
  await page.maximize();

  await page.goto('https://instagram.com/', {
      "waitUntil" : "networkidle0"
  });

  console.log('On Instagram.');

  await page.waitForSelector('#loginForm > div > div:nth-child(1) > div > label > input');
  if ((await page.$('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR')) !== null) {
      await page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR');
  }
  await page.type('#loginForm > div > div:nth-child(1) > div > label > input', process.env.USERNAME);
  await page.type('#loginForm > div > div:nth-child(2) > div > label > input', process.env.PASSWORD);
  await page.click('#loginForm > div > div:nth-child(3) > button');
  await page.waitForNavigation();

  console.log('Logged in.');

  await page.goto('https://www.instagram.com/explore/people/suggested/');
  await page.waitForSelector('#react-root > section > main > div > div.DPiy6.Igw0E.IwRSH.eGOV_._4EzTm.HVWg4 > div > div > div:nth-child(1) > div.Igw0E.rBNOH.YBx95.ybXk5._4EzTm.soMvl');

  let i;
  let selector='';
  for(i=1;i<=5;i++){
      selector=`#react-root > section > main > div > div.DPiy6.Igw0E.IwRSH.eGOV_._4EzTm.HVWg4 > div > div > div:nth-child(${i}) > div.Igw0E.rBNOH.YBx95.ybXk5._4EzTm.soMvl`;
      await page.click(selector);
  };

  // await page.goto('https://www.instagram.com/automated_generation/');

  // await page.waitForSelector('#react-root > section > main > div > ul > li:nth-child(2) > a > span');

  //await browser.close();

  console.log('Done.');

})();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Sending Email using Node.js',
    text: 'How are u bro ?'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });