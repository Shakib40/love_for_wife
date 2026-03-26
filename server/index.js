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
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'test',
        pass: 'test'
    }
});

app.post('/api/send-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    // Mock email sending - just log to console for demo
    console.log(`Mock email sent to ${email} with OTP: ${otp}`);
    
    // Create beautiful email template
    const htmlTemplate = `
      <div style="font-family: 'Amiri', 'Lato', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fdf6e3; text-align: center; border-radius: 8px; border: 1px solid rgba(201,168,76,0.3);">
        <h1 style="color: #c9a84c; margin-bottom: 20px; font-family: 'Cinzel Decorative', serif; font-size: 2rem;">Welcome</h1>
        <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          Your secure verification code is below. This code is valid for 5 minutes.
        </p>
        <div style="background-color: #1a0e2e; padding: 20px; border-radius: 6px; display: inline-block; margin: 20px 0;">
          <h2 style="color: #e8cc7a; font-size: 32px; letter-spacing: 5px; margin: 0; font-weight: bold;">${otp}</h2>
        </div>
        <p style="color: #b8a07a; font-size: 14px; margin-top: 30px; font-style: italic;">
          May Allah bless you. If you did not request this OTP, please ignore this email.
        </p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(201,168,76,0.2);">
          <p style="color: #c9a84c; font-size: 12px; margin: 0;">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      </div>
    `;
    
    try {
        // Simulate email delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, you would use nodemailer here:
        // await transporter.sendMail({
        //   from: process.env.EMAIL_USER,
        //   to: email,
        //   subject: 'Your OTP Verification Code',
        //   html: htmlTemplate
        // });
        
        // For demo, log the template
        console.log('Email template created:', htmlTemplate);
        
        res.json({ 
            success: true, 
            message: 'OTP sent successfully',
            otp: otp // Include OTP in response for demo
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Node backend successfully started and listening on port ${PORT}`);
});
