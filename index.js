require('dotenv').config()//define dotenv configuration file-->

const express = require('express');//express module required -->
const port = process.env.PORT || 8000;
const path = require('path');
// var csv = require('csvtojson');


const db = require('./config/mongoose')//mongoose connection-->


const app = express();//initialize application

app.set('view engine', 'ejs');//set view engine-->
app.set('views', path.join(__dirname, 'views'));//set views folder-->
app.use(express.urlencoded({ extended: false }));//it parses the incoming request with payload is based on body parser
app.use(express.static('./assets'))//set static folder;

app.use('/',require('./routes'))//send request to routes folder

//server listen om  port number
app.listen(port, function (err) {
    if (err) {
        console.log("Error listening " + err);
        return;
    }
    console.log("App listening " + port);
});

