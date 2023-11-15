const express = require('express');
const router = express.Router();

const receiveImage = require('../middlewares/multerMiddleware');
// const { uploadImage, getResized } = require('../utils/cloudinaryUtil');
const cloudinary = require('../utils/cloudinaryUtil').cloudinary;
const uploadImage = require('../utils/cloudinaryUtil').uploadImage;
const getResized = require('../utils/cloudinaryUtil').getResized;

const { UploadStream } = require('cloudinary');

router.post('/upload', (req, res) => {
    receiveImage(req, res, async (err) => {
        //handling errors from multer
        if (err) {
            return res.json({ error: err.message });
        }

        try {
            const imageStream = req.file.buffer;
            const imageName = new Date().getTime().toString();

            
            const uploadResult = await uploadImage(imageStream, imageName);
            const urlMin = getResized(imageName);

            const uploadedUrl = uploadResult.url;
            return res.json({ url: uploadedUrl, url_min: urlMin });
        } catch (error) {
            return res.json({ error: 'Failed to upload' });
        }
    })
});

module.exports = router;