const express = require('express');//express module-->

const router = express.Router();//create new Router Object-->
const multer = require('multer')
const mainController=require('../controller/main_controller');

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
router.get('/', mainController.home);

//uload file when user submit form 
router.post('/upload_CSVfiles', upload.single('csvfile'),mainController.upload_CSVfiles)

//when user wants to delete the file-->
router.get('/delete_file',mainController.delete_file);

//when user wants see file in the table form-->
router.get('/file', mainController.view_file);

//export router 
module.exports = router;
