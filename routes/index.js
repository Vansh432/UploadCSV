const express = require('express');//express module-->

const router = express.Router();//create new Router Object-->
const fastCsv = require('fast-csv')//
const multer = require('multer')

var fs = require('fs');//file system module[it uses file operation, i am used for read,unlink]
const path = require('path');//path module

const csv_schema = require('../models/CSV_file');//schema --->

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })


router.get('/', (req, res) => {
    csv_schema.find({}).then(data => {
        return res.render('home', { data });
    }).catch(err => err);
})

router.post('/upload_CSVfiles', upload.single('csvfile'), (req, res) => {
    const file = req.file;
    const fileName = file.originalname;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (fileExtension !== 'csv') {
        return res.redirect('back');
    }
    csv_schema.create(req.file).then(newFile => {
        return res.redirect('back');
    }).catch(err => {
        console.log("Error on creating file: " + err);
    })

});


router.get('/delete_file', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'uploads', req.query.filename);
        const normalizedPath = filePath.replace(/\\/g, '/');
        fs.unlinkSync(normalizedPath);
        csv_schema.findByIdAndDelete(req.query.id).then(function (delete_file) {
            return res.redirect('/');
        }).catch((err) => {
            return res.status(500).send('Internal Server Error');
        })

    } catch (err) {
        console.log('Error deleting file:', err);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.query.filename);
    const csvFilePath = filePath.replace(/\\/g, '/');
    const readData = fs.createReadStream(csvFilePath)
    const data = [];
    readData
        .pipe(fastCsv.parse())
        .on('data', (row) => {
            data.push(row);
        }).on('end', (rowCount) => {
            let page = req.query.page || 1;
            let arr;
            if (page == 1) arr = data.slice(1, 100);
            else arr = data.slice((page - 1) * 100, page * 100);

            return res.render('file', { heading: data[0], detail: arr, filename: req.query.filename, data: data });
        })

});

module.exports = router;
