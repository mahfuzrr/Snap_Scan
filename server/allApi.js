const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const imageToTextController = require('./controllers/imageToTextController');
const sendEmailController = require('./controllers/sendEmailController');
const verifyCAPTCHA = require('./controllers/verifyCAPTCHA');

// initial api endpoint
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to OCR API !',
    });
});

// for generating text from image
router.post('/get-ocr-text', upload.any(), imageToTextController);

//for verifying captcha
router.post('/verify-captcha', verifyCAPTCHA);

// for submiting bug
router.post('/report-bug', sendEmailController);

module.exports = router;
