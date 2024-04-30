const dotenv = require('dotenv');
dotenv.config();

const verifyCAPTCHA = (req, res) => {
    const {captchaValue} = req.body;

    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SITE_SECRETE}&response=${captchaValue}`, {
        method: 'POST',
    }).then((result) => {
        result.json().then((data) => {
            res.json({
                success: true,
                message: data,
            });
        })
    }).catch((err) => {
        res.json({
            success: false,
            message: err?.message,
        });
    })
    
}

module.exports = verifyCAPTCHA;