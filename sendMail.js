const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'christine59@ethereal.email',
        pass: 'eyDYp1TzD9JBhcPJVT'
    }
});

// example from nodemailer docs
// async..await is not allowed in global scope, must use a wrapper
async function sendMail(msg) {
  console.log('[MAIL] - Sending email...');

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Christine👻" <christine59@ethereal.email>', // sender address
    to: "contact@porobert.dev", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Hello world?</h1><p>${msg}</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = sendMail;