const nodemailer = require('nodemailer');

const sendEmail = async option => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PASSWORD,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  //  Define the email options
  const mailOptions = {
    from: 'Jonas Shith <hello@jonas.io>',
    to: option.email,
    subject: option.subject,
    text: option.text
    // html
  };
  //  Send The Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
