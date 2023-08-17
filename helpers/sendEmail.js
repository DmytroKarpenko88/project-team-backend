const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'kardmitriy@gmail.com' };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
// const email = {
//   to: 'daltumaspa@gufum.com',
//   from: 'dmytro@gmail.com',
//   subject: 'Text email',
//   html: ' <p><strong>Test email</strong> from localhost:4000</p>',
// };

// sgMail
//   .send(email)
//   .then(() => console.log('Email send success'))
//   .catch(error => console.log(error.massage));
