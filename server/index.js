import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/send-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const htmlTemplate = `
      <div style="font-family: 'sans-serif'; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fdf6e3; text-align: center; border-radius: 8px; border: 1px solid rgba(201,168,76,0.3);">
        <h1 style="color: #c9a84c; margin-bottom: 20px; font-family: 'serif';">Welcome</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Your secure verification code is below. This code is valid for 5 minutes.
        </p>
        <div style="background-color: #1a0e2e; padding: 20px; border-radius: 6px; display: inline-block;">
          <h2 style="color: #e8cc7a; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h2>
        </div>
        <p style="color: #b8a07a; font-size: 14px; margin-top: 30px; font-style: italic;">
          May Allah bless you. If you did not request this OTP, please ignore this email.
        </p>
      </div>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER || 'noreply@yourdomain.com',
        to: email,
        subject: 'Your OTP Verification Code',
        text: `Your verification code is: ${otp}. Valid for 5 minutes.`,
        html: htmlTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Node backend successfully started and listening on port ${PORT}`);
});
