var nodemailer = require('nodemailer')

exports.sendMailer = (url, email) => {
    console.log("In mailer", process.env.EMAIL, process.env.PASSWORD)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'reset password',
        description: 'click to reset your password',
        text: url
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}