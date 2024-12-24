const fs = require('fs');
const puppeteer = require('puppeteer');

async function saveSessionCookies() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to Suno login page
    await page.goto('https://suno.com/login');

    console.log('Please log in manually and complete any 2FA...');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Save cookies after logging in
    const cookies = await page.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies));
    console.log('Cookies saved to cookies.json');
  } catch (error) {
    console.error('Error saving cookies:', error);
  } finally {
    await browser.close();
  }
}

saveSessionCookies();
