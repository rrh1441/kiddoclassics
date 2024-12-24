const express = require('express');
const { twiml } = require('twilio');

const app = express();
const port = 3000; // You can change this to any available port

// Middleware to parse incoming requests (Twilio sends POST requests)
app.use(express.urlencoded({ extended: true }));

// Webhook endpoint for incoming SMS
app.post('/sms', (req, res) => {
  console.log('Incoming SMS:', req.body);

  // Example: Log the message body and sender
  const messageBody = req.body.Body;
  const fromNumber = req.body.From;

  console.log(`Received message: "${messageBody}" from ${fromNumber}`);

  // Respond to Twilio (empty response like the PHP example)
  const twimlResponse = new twiml.MessagingResponse();
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twimlResponse.toString());
});

// Start the server
app.listen(port, () => {
  console.log(`Twilio webhook listening at http://localhost:${port}/sms`);
});

