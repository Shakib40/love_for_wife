import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

// Restrict CORS to your frontend origin
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    methods: ['POST'],
}));

app.use(express.json());

// Rate limit: max 5 OTP requests per IP per 15 minutes
const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

const isDemoMode =
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    process.env.EMAIL_USER === 'test@gmail.com' ||
    process.env.EMAIL_PASS === 'test';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'shakib.jilani@sakhaglobal.com',
        pass: 'shdellwoudxstmnv',
    },
});

// Basic email format validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildHtmlTemplate(otp) {
    return `
    <div style="font-family: 'Amiri', 'Lato', sans-serif; max-width: 600px; margin: 0 auto;
                padding: 40px 20px; background-color: #fdf6e3; text-align: center;
                border-radius: 8px; border: 1px solid rgba(201,168,76,0.3);">
      <h1 style="color: #c9a84c; margin-bottom: 20px;
                 font-family: 'Cinzel Decorative', serif; font-size: 2rem;">Welcome</h1>
      <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        Your secure verification code is below. This code is valid for 5 minutes.
      </p>
      <div style="background-color: #1a0e2e; padding: 20px; border-radius: 6px;
                  display: inline-block; margin: 20px 0;">
        <h2 style="color: #e8cc7a; font-size: 32px; letter-spacing: 5px;
                   margin: 0; font-weight: bold;">${otp}</h2>
      </div>
      <p style="color: #b8a07a; font-size: 14px; margin-top: 30px; font-style: italic;">
        May Allah bless you. If you did not request this OTP, please ignore this email.
      </p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(201,168,76,0.2);">
        <p style="color: #c9a84c; font-size: 12px; margin: 0;">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>`;
}

app.post('/api/send-otp', otpLimiter, async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // OTP sanity check — should be a short numeric string generated server-side ideally
    if (typeof otp !== 'string' || !/^\d{4,8}$/.test(otp)) {
        return res.status(400).json({ success: false, message: 'Invalid OTP format.' });
    }

    const mailOptions = {
        from: `"Verification" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP Verification Code',
        text: `Your verification code is: ${otp}. Valid for 5 minutes.`,
        html: buildHtmlTemplate(otp),
    };

    if (isDemoMode) {
        // Demo mode: log to console only, never expose OTP in response
        console.log(`[DEMO] OTP for ${email}: ${otp}`);
        return res.json({ success: true, message: 'OTP sent (demo mode — check server console).' });
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent to ${email}`);
        return res.json({ success: true, message: 'OTP sent successfully.' });
    } catch (error) {
        // Log internally, don't leak error details to client
        console.error('❌ Failed to send OTP email:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} [${isDemoMode ? 'DEMO' : 'PRODUCTION'} mode]`);
});