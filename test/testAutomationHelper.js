const puppeteer = require("puppeteer");
const keys = require("../config/keys");

module.exports = async function googleLogin() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://localhost:4000/auth/google");
    await page.mainFrame().waitForSelector("#identifierId");
    // console.log("typing email...");
    await page.type("#identifierId", keys.TEST_GOOGLE_ACCT);
    await page.mainFrame().waitForSelector("#identifierNext");
    // console.log("clicking next button...");
    await page.click("#identifierNext");
    // console.log("waiting for password field...");
    await page
      .mainFrame()
      .waitForSelector('#password input[type="password"]', { visible: true });
    // console.log("typing password...");
    await page.type(
      '#password input[type="password"]',
      keys.TEST_GOOGLE_PSSWRD
    );
    // console.log("clicking sign in button...");
    await page.click("#passwordNext", { delay: 100 })
    await page.close()
    await browser.close()
    return true;
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
    return false;
  }
};