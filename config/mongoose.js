const mongoose = require('mongoose');// mongoose module-->

mongoose.connect(process.env.MONGODB);//connect to MongoDB atlas

const db=mongoose.connection;
db.on('error',console.error.bind(console, "error connecting db"));

db.once('open',()=>{
    console.log("mongodb connection succefully established");
})