const nodemailer = require('nodemailer');
const router = require('express').Router();
const mg = require('mailgun-js');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

router.get('/test', verifyTokenAndAdmin, async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    //for production values should be set in .env
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'sarai.pagac@ethereal.email',
      pass: 'Xz1Ap2t1Ydm8TyphfX',
    },
  });

  let info = await transporter.sendMail({
    from: '"3D shop" <3dshop@mail.com>',
    to: 'vvooki99@gmail.com',
    subject: 'Hello',
    html: '<h2>Sending email</h2><main><a href="https://google.com">pobierz</a></main>',
  });
  res.json(info);
});

router.post('/test1', verifyTokenAndAdmin, async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'vvooki99@gmail.com', // Change to your recipient
    from: 'vvooki99@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
});

const mailgun = () => {
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
};

router.post('/send', verifyTokenAndAdmin, async (req, res) => {
  const { status, subject, id } = req.body;
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  })
    .messages()
    .send(
      {
        from: 'vvooki99@gmail.com',
        to: 'vvooki99@gmail.com',
        subject: subject,
        html: `<strong>Dear customer, your order - ${id} just changed status to: ${status} </strong>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).json(error);
        } else {
          res.status(200).json('email sent successfully');
        }
      }
    );
});

router.post('/files', async (req, res) => {
  const { files } = req.body;
  const msg = `<h2>Dear customer, here are the link(s) to download 3d Models you purchased <br> ${files.map(
    (file) => {
      return `<a href=${file}>${file}</a> <br>`;
    }
  )} </h2>`;

  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  })
    .messages()
    .send(
      {
        from: 'vvooki99@gmail.com',
        to: 'vvooki99@gmail.com',
        subject: 'Purchased 3D files',
        html: msg,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).json(error);
        } else {
          res.status(200).json('email sent successfully');
        }
      }
    );
});

module.exports = router;
