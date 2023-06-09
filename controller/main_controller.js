const fastCsv = require('fast-csv')//

const csv=require('csvtojson');

var fs = require('fs');//file system module[it uses file operation, i am used for read,unlink]
const path = require('path');//path module

const csv_schema = require('../models/CSV_file');//schema --->

//rendering home page--->
module.exports.home=function(req,res){
  
        csv_schema.find({}).then(data => {
            return res.render('home', { data });
        }).catch(err => err);
}


//ulpoad csv file -->
module.exports.upload_CSVfiles = function(req,res){
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
}


//view a file in the table form-->
module.exports.view_file=function(req,res){
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
    
}

//delete file -->
module.exports.delete_file =function(req,res){

        try {
            csv_schema.findByIdAndDelete(req.query.id).then(function (delete_file) {
                return res.redirect('/');
            }).catch((err) => {
                return res.status(500).send('Internal Server Error');
            })
    
        } catch (err) {
            console.log('Error deleting file:', err);
            return res.status(500).send('Internal Server Error');
        }

}
