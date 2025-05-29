import nodemailer from 'nodemailer';

export const sendEmail = async (options: { to: string; subject: string; text: string }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT), 
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: options.to,
    subject: options.subject, 
    text: options.text,
  };

  await transporter.sendMail(message);
};