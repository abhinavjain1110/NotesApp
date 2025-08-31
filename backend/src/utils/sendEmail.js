/* import nodemailer from 'nodemailer';


export async function sendEmail({ to, subject, html }) {
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;
if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
console.log('\n[Email Mock] To:', to, '\nSubject:', subject, '\nHTML:\n', html, '\n');
return { mocked: true };
}
const transporter = nodemailer.createTransport({
host: SMTP_HOST,
port: Number(SMTP_PORT || 587),
secure: false,
auth: { user: SMTP_USER, pass: SMTP_PASS }
});
return transporter.sendMail({ from: EMAIL_FROM || SMTP_USER, to, subject, html });
} */
/* import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("\n[Email Mock] To:", to, "\nSubject:", subject, "\nHTML:\n", html, "\n");
    return { mocked: true };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,              // smtp-relay.brevo.com
    port: Number(SMTP_PORT || 587),
    secure: false,                // Brevo uses STARTTLS on 587
    auth: {
      user: SMTP_USER,            // your Brevo login email
      pass: SMTP_PASS,            // your Brevo SMTP key
    },
  });

  return transporter.sendMail({
    from: EMAIL_FROM || SMTP_USER, // e.g. "NotesApp <no-reply@notesapp.com>"
    to,
    subject,
    html,
  });
} */
// utils/sendEmail.js
// src/utils/sendEmail.js
// src/utils/sendEmail.js
import axios from "axios";

export async function sendEmail({ to, subject, html }) {
  const { BREVO_API_KEY, EMAIL_FROM } = process.env;

  if (!BREVO_API_KEY) {
    console.log("\n[Email Mock] To:", to, "\nSubject:", subject, "\nHTML:\n", html, "\n");
    return { mocked: true };
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: EMAIL_FROM },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,   // ✅ authentication
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Brevo email error:", err.response?.data || err.message);
    throw err;
  }
}





