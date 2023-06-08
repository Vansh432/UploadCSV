const express = require('express');//express module-->

const router = express.Router();//create new Router Object-->
const fastCsv = require('fast-csv')//
const multer = require('multer')
const csv=require('csvtojson');

var fs = require('fs');//file system module[it uses file operation, i am used for read,unlink]
const path = require('path');//path module

const csv_schema = require('../models/CSV_file');//schema --->

//multer is middleware thar it used for handling multipart/form-data that when user upload a file in form-->
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './routes/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

//upload file--->
const upload = multer({ storage })

//home page-->
router.get('/', (req, res) => {
    csv_schema.find({}).then(data => {
        return res.render('home', { data });
    }).catch(err => err);
})

//uload file when user submit form 
router.post('/upload_CSVfiles', upload.single('csvfile'), (req, res) => {

    let  filepath=req.file.path;
    const csvFilePath = filepath.replace(/\\/g, '/');
    const readData = fs.createReadStream(csvFilePath);
    const data = [];
    readData
        .pipe(fastCsv.parse())
        .on('data', (row) => {
            data.push(row);
        }).on('end', (rowCount) => {
            csv_schema.create({
                        filename: req.file.filename,
                        originalname: req.file.originalname,
                        head_row: data[0],
                        detail_rows: data,
                      }).then((data)=>{
                        return res.redirect('back');
        }).catch(err=>err);
     
        }).on('error', (err) => err);
          
});

//when user wants to delete the file-->
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

//when user wants see file in the table form-->
router.get('/file', (req, res) => {
    console.log(req.query)
    let id=req.query.id;
    csv_schema.findById(id).then((newdata)=>{
        data=newdata.detail_rows
        let page = req.query.page || 1;
        let arr;
        if (page == 1) arr = data.slice(1, 100);
        else arr = data.slice((page - 1) * 100, page * 100);
        return res.render('file',{heading:newdata.head_row,detail:arr,data: data, id:id });
        
    }).catch((err)=>{
       return err.message("Error rendering file");
    })

});

//export router 
module.exports = router;
