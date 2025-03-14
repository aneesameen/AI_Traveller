const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aneesameen00@gmail.com",
        pass: "bixuweerclarywql",
    },
});

const sendMail = async (to, subject, text, html = null) => {
    try {
        const mailOptions = {
            from: "aneesameen00@gmail.com",
            to,
            subject,
            text,
            html: html || text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
};

module.exports = sendMail;
