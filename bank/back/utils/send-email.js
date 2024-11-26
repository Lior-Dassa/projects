import nodemailer from 'nodemailer';

const baseText = 'Your confirmation code is ';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER_NAME,
      pass: process.env.GMAIL_PASSWORD
    }
});

let mailOptions = {
    from: 'mobank158@gmail.com',
    subject: 'Mo Bank user confirmation code',
};

const sendEmail = function(email, code) {
    console.log(email);
    mailOptions.to = email;
    mailOptions.text = baseText + code;

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw new Error(error.message);
        }
    });
}

export default sendEmail;

