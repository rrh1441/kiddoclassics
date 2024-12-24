const cron = require('node-cron');
const { checkCookieValidity } = require('./checkCookies');

cron.schedule('0 */1 * * *', () => {
  console.log('Running cookie validity check...');
  checkCookieValidity();
});
