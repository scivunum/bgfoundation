const nodemailer = require('nodemailer');

async function sendMail(username, password, from, to, subject, text, html) {
    try {
        // Create a Nodemailer transporter using SMTP
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com', // Your SMTP server host
            port: 587, // Your SMTP port
            secure: false, // true for 465, false for other ports
            auth: {
                user: username, // Your email username
                pass: password // Your email password
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        });

        console.log("Message sent: %s", info.messageId);
        return true; // Return true if email is sent successfully
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        return false; // Return false if there's an error
    }
}

module.exports = {
    sendMail
}

// Example usage:
// sendMail(username, password,'sender@example.com', 'recipient@example.com', 'Test Email', 'Hello, this is a test email.', '<p>Hello, this is a test email.</p>');
