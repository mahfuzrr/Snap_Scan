const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
});

const sendEmailController = async(req, res) => {
    const {name, email, message} = req.body;
    try{
        const info = await transporter.sendMail({
            from: `"${name}" <${email}>`, // sender address
            to: "contact.mhblog1@gmail.com", // list of receivers
            subject: "Reporting website bug", // Subject line
            text: message, // plain text body
        });
        if(info.rejected.length){
            res.json({
                success: false,
                message: 'Something went wrong!'
            });
        }
        else if(info.messageId){
            res.json({
                success: true,
                message: "Sent Succussfully!"
            });
        }
    }
    catch(err){
        res.json({
            success: false,
            message: err?.message,
        });
    }
}

module.exports = sendEmailController;