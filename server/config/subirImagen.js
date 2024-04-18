const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.params.id;
        const dir = path.join(__dirname, `../uploads/${userId}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const userId = req.params.id;
        const fileName = userId + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage });

upload.errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.log('Multer error: ', err);
        return res.status(400).json({ message: err.message });
    } else if (err) {
        console.log('Error: ', err.message);
        return res.status(400).json({ message: err.message });
    }
    next();
};

module.exports = upload;

