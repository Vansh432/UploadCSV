const mongoose=require('mongoose');

const csvfile =new mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    originalname:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('empModel', csvfile);

