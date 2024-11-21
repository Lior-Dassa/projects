import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mobank158@gmail.com',
    pass: 'hhgt xpoj frpl qgiv'
  }
});

var mailOptions = {
  from: 'mobank158@gmail.com',
  to: 'liordassa7495@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const mockSendEmail = function(req, res) {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}

export default mockSendEmail;


