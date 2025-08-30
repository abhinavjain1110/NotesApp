/* import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import rateLimit from 'express-rate-limit';
import { OAuth2Client } from 'google-auth-library';


const router = express.Router();


const otpLimiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


function sign(user) {
return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}
router.post('/verify-otp', async (req, res) => {
try {
const { email, otp } = req.body;
if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });


const user = await User.findOne({ email });
if (!user || !user.otpHash) return res.status(400).json({ message: 'Request a new OTP' });


if (new Date() > new Date(user.otpExpiresAt)) {
return res.status(400).json({ message: 'OTP expired' });
}


const hash = crypto.createHash('sha256').update(String(otp)).digest('hex');
if (hash !== user.otpHash) return res.status(400).json({ message: 'Invalid OTP' });


user.otpHash = undefined;
user.otpExpiresAt = undefined;
await user.save();


const token = sign(user);
res.json({ token, user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar, provider: user.provider } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'OTP verification failed' });
}
});

// Google Sign-In (ID token from frontend)
router.post('/google', async (req, res) => {
try {
const { idToken } = req.body;
if (!idToken) return res.status(400).json({ message: 'Missing idToken' });


const ticket = await googleClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
const payload = ticket.getPayload();
const email = payload.email;


let user = await User.findOne({ email });
if (!user) {
user = await User.create({
email,
name: payload.name || '',
provider: 'google',
googleId: payload.sub,
avatar: payload.picture
});
}


const token = sign(user);
res.json({ token, user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar, provider: user.provider } });
} catch (err) {
console.error(err);
res.status(401).json({ message: 'Google auth failed' });
}
});


// Get profile (for demo)
router.get('/me', async (req, res) => {
res.json({ ok: true });
});


export default router; */
import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';
import rateLimit from 'express-rate-limit';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();

const otpLimiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function sign(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

/**
 * ✅ Request OTP
 */
router.post('/request-otp', otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP before saving
    const hash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, provider: 'email' });
    }

    user.otpHash = hash;
    user.otpExpiresAt = expiry;
    await user.save();

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

/**
 * ✅ Verify OTP
 */
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const user = await User.findOne({ email });
    if (!user || !user.otpHash) return res.status(400).json({ message: 'Request a new OTP' });

    if (new Date() > new Date(user.otpExpiresAt)) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    const hash = crypto.createHash('sha256').update(String(otp)).digest('hex');
    if (hash !== user.otpHash) return res.status(400).json({ message: 'Invalid OTP' });

    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const token = sign(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar, provider: user.provider }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'OTP verification failed' });
  }
});

// ✅ Google Sign-In
router.post('/google', async (req, res) => {
    console.log("ID Token:", req.body.idToken?.slice(0, 15));
console.log("Env Client ID:", process.env.GOOGLE_CLIENT_ID);
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: 'Missing idToken' });

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: payload.name || '',
        provider: 'google',
        googleId: payload.sub,
        avatar: payload.picture
      });
    }

    const token = sign(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name, avatar: user.avatar, provider: user.provider }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Google auth failed' });
  }
});

// ✅ Get profile
router.get('/me', async (req, res) => {
  res.json({ ok: true });
});

export default router;
