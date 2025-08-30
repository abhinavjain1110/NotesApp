import nodemailer from 'nodemailer';


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
}