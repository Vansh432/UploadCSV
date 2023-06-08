const mongoose=require('mongoose');
//make schema store path , original name and filename-->
const csvfile =new mongoose.Schema({
    filename:{
        type: String,
        require:true
    },
    originalname:{
        type: String,
        require:true
    },
    head_row:{
        type:[]
    },
    detail_rows:{
        type:[]
    }
});


module.exports = mongoose.model('empModel', csvfile);

