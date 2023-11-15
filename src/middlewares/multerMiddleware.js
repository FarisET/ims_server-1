const multer = require('multer');

const storage = multer.memoryStorage();

const multerMiddleware = multer({
  storage: storage,
  // Limiting file size to 5Mb
  limits: { fileSize: 5 * 1024 * 1024 },
  // Accepting only jpg, jpeg, png files
  fileFilter: function (req, file, cb) {
    const fileRegex = /\.(jpg|jpeg|png)$/i;
    const fileName = file.originalname;

    if (!fileName.match(fileRegex)) {
      // Throw exception
      return cb(new Error('Invalid file type'));
    }
    // Pass the file
    cb(null, true);
  },
}).single('image'); // Single for accepting only one file from the image form-data key

module.exports = multerMiddleware;
