const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB);

const db=mongoose.connection;
db.on('error',console.error.bind(console, "error connecting db"));

db.once('open',()=>{
    console.log("mongodb connection succefully established");
})