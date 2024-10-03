const express = require('express');
const axios = require('axios');
const cors = require('cors');
const speakeasy = require('speakeasy');  // Add speakeasy for 2FA
const qrcode = require('qrcode');  // Add qrcode for QR code generation

const app = express();
const port = process.env.PORT || 3001;

const API_KEY = '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';

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// API route for ChatGPT requests
app.post('/api/chat', async (req, res) => {
  const message = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,  // API key hardcoded here
          'Content-Type': 'application/json',
        }
      },
    );
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send('Error communicating with ChatGPT API');
  }
});

// Generate 2FA secret and QR code
app.post('/api/generate-2fa', (req, res) => {
  const secret = speakeasy.generateSecret({
    name: 'VIP Access',
  });

  qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
    if (err) {
      return res.status(500).json({ message: 'Error generating QR code' });
    }

    res.json({
      secret: secret.base32,  // Send secret to the client
      qrCode: dataUrl,        // Send QR code data URL to display on the client
    });
  });
});

// Verify the token entered by the user
app.post('/api/verify-otp', (req, res) => {
  const { token, secret } = req.body;

  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
  });

  if (verified) {
    res.json({ verified: true, message: '2FA success' });
  } else {
    res.status(400).json({ verified: false, message: 'Invalid token' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
