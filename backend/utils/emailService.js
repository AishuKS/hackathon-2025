const nodemailer = require('nodemailer');

let transporter;

async function createTestTransporter() {
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });

  console.log('✅ Ethereal test account ready!');
  console.log(`📨 Preview URL will appear in console when email is sent.`);
}

createTestTransporter(); // call this to initialize the transporter

const sendEmail = async (to, subject, html) => {
  try {
    if (!transporter) {
      return console.error('❌ Transporter not initialized');
    }

    const info = await transporter.sendMail({
      from: '"Plate2Purpose" <15aish1998@gmail.com>',
      to,
      subject,
      html
    });

    console.log(`✅ Email sent to ${to}`);
    console.log(`📨 Preview: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error(`❌ Email failed: ${error.message}`);
  }
};

module.exports = { sendEmail };
