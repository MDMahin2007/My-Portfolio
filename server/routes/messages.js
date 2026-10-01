const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const router = express.Router();
const Message = require('../models/Message');

const sendNotification = async ({ name, phone, email, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return false;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
  await transporter.sendMail({
    from: `Mahin.dev contact form <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}`,
  });
  return true;
};

router.post('/', async (req, res) => {
  const { name, phone = '', email, message } = req.body;
  const payload = {
    name: typeof name === 'string' ? name.trim() : '',
    phone: typeof phone === 'string' ? phone.trim() : '',
    email: typeof email === 'string' ? email.trim().toLowerCase() : '',
    message: typeof message === 'string' ? message.trim() : '',
  };
  if (!payload.name || !payload.email || !payload.message) return res.status(400).json({ message: 'Name, email, and message are required.' });

  try {
    let savedToDatabase = false;
    if (mongoose.connection.readyState === 1) {
      try {
        await new Message(payload).save();
        savedToDatabase = true;
      } catch (error) {
        console.error('Message database save failed:', error.message);
      }
    }

    let emailSent = false;
    let deliveryError = '';
    try {
      emailSent = await sendNotification(payload);
      if (!emailSent) deliveryError = 'Server email credentials are missing or incomplete.';
    } catch (emailError) {
      deliveryError = emailError.code === 'EAUTH'
        ? 'Gmail authentication failed. Check EMAIL_USER and EMAIL_PASS in server/.env.'
        : emailError.code === 'ETIMEDOUT' || emailError.code === 'ESOCKET'
          ? 'The Gmail SMTP connection timed out. Check your network or Gmail SMTP access.'
          : 'The Gmail notification service is unavailable right now.';
      console.error('Notification email failed:', emailError.message);
    }

    if (!emailSent) {
      return res.status(202).json({
        message: savedToDatabase
          ? 'Message was saved, but email delivery is unavailable. Use the direct email option to send it now.'
          : 'Message could not be delivered by the server yet. Use the direct email option.',
        emailSent: false,
        savedToDatabase,
        deliveryError,
        fallbackRequired: true,
      });
    }
    res.status(201).json({ message: 'Message sent successfully.', emailSent, savedToDatabase });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  try { res.json(await Message.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
