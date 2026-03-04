import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const info = await transporter.sendMail({
    from: "arifulxf@gmail.com",
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  return info;
}
