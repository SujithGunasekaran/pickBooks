var express = require("express");
var mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
var bcrypt = require("bcrypt");
var app = express();
var path = require('path');


dotenv.config();

var PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`);
})

app.use(express.json());
//Remove or comment line no 20 if you delete public folder in server
app.use(express.static("public"));
// app.use(express.urlencoded({extended:false}))
app.use(cors());

const uri = process.env.MongoURI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true});

var connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Atlas Connected Successfully");
})

// Remove or Comment line no from 33 to 35 if you delete public folder in server 
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const userinfoRouter = require('./model/routes/userinfo');
const usercartRouter = require('./model/routes/usercart');

app.use('/userinfo',userinfoRouter);
app.use('/usercart',usercartRouter);

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('public'));
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname + '/public/index.html'));
    })
}
