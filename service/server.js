require("dotenv").config();
const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

async function Scrape() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      "--window-size=1366,768",
      "--window-position=0,0",
      "--disable-notifications",
      "--block-new-web-contents",
      "--disable-print-preview",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(0);

  await page.goto("https://portal.nysc.org.ng/nysc1/ResumePayment.aspx", {
    waitUntil: "networkidle0",
  });

  await page.type(`.form-group [type="text"]`, process.env.EMAIL);
  await page.type(`.form-group [type="password"]`, process.env.PASSWORD);

  await page.evaluateOnNewDocument(() => {
    window.open = () => null;
    window.print = () => null;
  });

  await Promise.all([
    page.click(`.form-group [type="submit"]`),
    page.waitForNavigation({
      waitUntil: ["domcontentloaded", "networkidle0"],
    }),
  ]);
  await page.evaluate(() => {
    if (document.querySelector(".ui-widget-overlay")) {
      document.querySelector(".ui-widget-overlay").style.display = "none";
    }
  });
  await page.screenshot({ path: "page.png", fullPage: true });

  await Promise.all([
    page.click(`a[href*="clearance"]`),
    page.waitForNavigation({ waitUntil: ["domcontentloaded", "networkidle0"] }),
  ]);

  await page.screenshot({ path: "clearance.png", fullPage: true });

  await Promise.all([
    page.click(`a[href*="logout"]`),
    page.waitForNavigation({
      waitUntil: ["domcontentloaded", "networkidle0"],
    }),
  ]);

  await browser.close();
}

Scrape();
