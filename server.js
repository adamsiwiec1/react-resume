const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()
const app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({
  extended: true
})); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  app.post('/send', (req, res, next) => {
    console.log(req.body)
    var name = req.body.contactName
    var email = req.body.contactEmail
    var subject = req.body.contactSubject
    var message = req.body.contactMessage
  
    var mail = {
      from: name,
      to: email,
      subject: subject,
      text: message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  });