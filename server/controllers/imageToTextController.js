const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const {createWorker} = require('tesseract.js');
const Jimp = require('jimp');

dotenv.config();

cloudinary.config({
    secure: true,
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const imageToTextController = async(req, res) => {
    const {lang, base64} = req.body;
    const worker = await createWorker(lang);
    cloudinary.uploader.upload(base64, opts).then((result) => {
        (async () => {
            const { data: { text } } = await worker.recognize(result?.url);
            await worker.terminate();
            res.json({
                success: true,
                message: text,
            });
        })();
    }).catch((err) => {
        res.json({
            success: false,
            message: err?.message,
        });
    });
}

module.exports = imageToTextController;