const fs = require('fs');
const { getBrowser } = require('../puppeteerConfig');

// Helper function for delays
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const { browser, page } = await getBrowser(false); // Launch in non-headless mode for manual login

  try {
    // Navigate to the Suno login page
    await page.goto('https://suno.com/', { waitUntil: 'networkidle2' });
    console.log('Please log in manually.');

    // Wait for 2 minutes for manual login
    await delay(2 * 60 * 1000);

    // Save cookies to a file
    const cookies = await page.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved to cookies.json.');

    // Save localStorage data
    const localStorageData = await page.evaluate(() => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }
      return data;
    });
    fs.writeFileSync('localStorage.json', JSON.stringify(localStorageData, null, 2));
    console.log('Local storage saved to localStorage.json.');

    // Save sessionStorage data
    const sessionStorageData = await page.evaluate(() => {
      const data = {};
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        data[key] = sessionStorage.getItem(key);
      }
      return data;
    });
    fs.writeFileSync('sessionStorage.json', JSON.stringify(sessionStorageData, null, 2));
    console.log('Session storage saved to sessionStorage.json.');
  } catch (error) {
    console.error('Error during login:', error.message);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
})();
