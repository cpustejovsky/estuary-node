const puppeteer = require("puppeteer-extra");
const keys = require("../../config/keys");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
module.exports = async function googleLogin() {
  //TODO: figure out how to make this automation work with the fullstack (front-end and back-end)
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("http://localhost:4000/auth/google");
    await page.screenshot({ path: "test.png"})
    await page.mainFrame().waitForSelector("#identifierId");
    await page.type("#identifierId", keys.TEST_GOOGLE_ACCT);
    await page.mainFrame().waitForSelector("#identifierNext");
    await page.click("#identifierNext");
    await page
      .mainFrame()
      .waitForSelector('#password input[type="password"]', { visible: true });
    await page.type(
      '#password input[type="password"]',
      keys.TEST_GOOGLE_PSSWRD
    );
    await page.click("#passwordNext")
    await page.close()
    await browser.close()
    return true;
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    return false;
  }
};