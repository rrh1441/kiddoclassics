const { getBrowser } = require('../puppeteerConfig');
const fs = require('fs');

(async () => {
  const { browser, page } = await getBrowser(true); // Headless mode

  try {
    console.log('Navigating to https://suno.com/create...');
    await page.goto('https://suno.com/create', { waitUntil: 'networkidle2' });

    // Inject localStorage after navigation
    const localStorageData = JSON.parse(fs.readFileSync('localStorage.json', 'utf8'));
    await page.evaluate((data) => {
      Object.keys(data).forEach((key) => localStorage.setItem(key, data[key]));
    }, localStorageData);
    console.log('Injected localStorage.');

    // Inject sessionStorage after navigation
    const sessionStorageData = JSON.parse(fs.readFileSync('sessionStorage.json', 'utf8'));
    await page.evaluate((data) => {
      Object.keys(data).forEach((key) => sessionStorage.setItem(key, data[key]));
    }, sessionStorageData);
    console.log('Injected sessionStorage.');

    // Reload the page to apply storage changes
    await page.reload({ waitUntil: 'networkidle2' });
    console.log('Page reloaded.');

    // Debug current cookies after reload
    const postReloadCookies = await page.cookies();
    console.log('Current cookies after reload:', JSON.stringify(postReloadCookies, null, 2));

    // Take a screenshot
    await page.screenshot({ path: 'create_page.png', fullPage: true });
    console.log('Screenshot of create page saved as create_page.png');
  } catch (error) {
    console.error('Error during Puppeteer test:', error);
  } finally {
    await browser.close();
  }
})();
