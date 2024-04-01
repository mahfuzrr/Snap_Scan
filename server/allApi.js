const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const imageToTextController = require('./controllers/imageToTextController');

// initial api endpoint
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to OCR API !',
    });
});

// for generating text from image
router.post('/get-ocr-text', upload.any(), imageToTextController);

module.exports = router;
