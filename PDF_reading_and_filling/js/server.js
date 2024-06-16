const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('express-promise-router')();
const mountRoutes = require('./routes');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

(async () => {
    const app = express();

    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use('/css', express.static(path.join(__dirname, '../css')));
    app.use('/js', express.static(path.join(__dirname, '../js')));
    app.use('/images', express.static(path.join(__dirname, '../images')));
    app.use('/', express.static(path.join(__dirname, '../Home')));
    app.use('/admin', express.static(path.join(__dirname, '../Admin')));
    app.use('/form', express.static(path.join(__dirname, '../PDF_reading_and_filling')));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    mountRoutes(router);
    app.use('/', router);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
})();
