import nodemailer from 'nodemailer'
import config from '../config/env';

export default function send() {
    
    const transporter = nodemailer.createTransport(config.mail, {
        // default message fields
        from: 'Sender Name <sender@example.com>'
    });

// Message object
    let message = {

        // Comma separated list of recipients
        to: '"Receiver Name" <receiver@example.com>',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔', //

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html: '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

    };

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
    });
    
}

