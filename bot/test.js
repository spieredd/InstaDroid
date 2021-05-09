const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const getScreenshot = async (username) => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    await page.goto(`https://instagram.com/${username}`, {
        waitUntil: "networkidle0",
    });
    await page.screenshot({ path: `${__dirname}/public/assets/test.png` });
    await browser.close();
};

module.getScreenshot = getScreenshot;