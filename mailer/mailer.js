const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'al44@ethereal.email',
        pass: 'vZaXFcMntFRz4ucgU1'
    }
};

module.exports = nodemailer.createTransport(mailConfig);
