const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(stealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Run in visible mode to manually log in
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.goto('https://suno.com', { waitUntil: 'networkidle2' });

  console.log('Please log in manually.');

  // Wait for manual login (e.g., 2 minutes or until login is detected)
  await page.waitForTimeout(120000);

  // Save cookies
  const cookies = await page.cookies();
  fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
  console.log('Cookies saved.');

  // Save local storage
  const localStorageData = await page.evaluate(() => JSON.stringify(localStorage));
  fs.writeFileSync('localStorage.json', localStorageData);
  console.log('Local storage saved.');

  // Save session storage
  const sessionStorageData = await page.evaluate(() => JSON.stringify(sessionStorage));
  fs.writeFileSync('sessionStorage.json', sessionStorageData);
  console.log('Session storage saved.');

  await browser.close();
})();

