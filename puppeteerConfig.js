const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Apply the stealth plugin
puppeteer.use(StealthPlugin());

async function getBrowser(headless = true) {
  const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // Adjust for your platform
  const userDataDir = './userData'; // Persistent profile directory

  try {
    // Launch Puppeteer with persistent profile
    const browser = await puppeteer.launch({
      headless,
      executablePath,
      userDataDir,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    return {
      browser,
      page: await browser.newPage(),
    };
  } catch (error) {
    console.error('Error launching Puppeteer:', error.message);
    throw error;
  }
}

module.exports = { getBrowser };
