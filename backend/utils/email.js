const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  // Configure email service provider
});

async function sendVerificationEmail(user) {
  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
  const mailOptions = {
    from: 'noreply@example.com',
    to: user.email,
    subject: 'Verify Your Email',
    html: `<p>Please click the link below to verify your email:</p>
           <a href="${process.env.CLIENT_URL}/verify-email/${token}">Verify Email</a>`
  };

  await transporter.sendMail(mailOptions);
}

async function sendResetPasswordEmail(user) {
  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  const mailOptions = {
    from: 'noreply@example.com',
    to: user.email,
    subject: 'Reset Your Password',
    html: `<p>Please click the link below to reset your password:</p>
           <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>`
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail
};