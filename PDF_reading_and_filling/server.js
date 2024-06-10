const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const router = require('express-promise-router')()
const mountRoutes = require('./routes');

const port = 63342;


// ! Для чего этот код?
const multer = require('multer');
// Настройка для загрузки файлов с использованием multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
// ! 


(async ()=> {
    const app = express();

    // Обслуживание статических файлов из папки uploads
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Обслуживание статических файлов из папки Home
    app.use('/', express.static(path.join(__dirname, '../', 'Home')));
    
    // Обслуживание статических файлов из папки Admin
    app.use('/admin', express.static(path.join(__dirname, '../', 'Admin')));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    mountRoutes(router);

	app.use('/', router);

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
})()
