const puppeteer = require('puppeteer');
const fs = require('fs');
const nodemailer = require('nodemailer');
const axios = require('axios');

async function checkCookieValidity() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Load saved cookies
    const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    await page.setCookie(...cookies);

    // Navigate to Suno protected page
    await page.goto('https://suno.com/create');

    // Check if redirected to login
    if (page.url().includes('login')) {
      console.log('Cookies have expired. Sending notification...');
      await notifyCookieExpiration();
    } else {
      console.log('Cookies are still valid.');
    }
  } catch (error) {
    console.error('Error checking cookie validity:', error);
  } finally {
    await browser.close();
  }
}

async function notifyCookieExpiration() {
  // Send an email notification
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'rrh1441@gmail.com',
    subject: 'Suno Cookie Expiration Alert',
    text: 'Your Suno session cookies have expired. Please log in to refresh them.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

checkCookieValidity();
