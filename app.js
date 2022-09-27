// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; //either uses server allocated port number or 3000 port number.
const ejs = require('ejs'); // importing ejs

const app = express(); //storing and initializing our express in the app variable. its just a good practice to use app variable, you can use any name however.

app.set('view engine', 'ejs'); //setting the default view engine to ejs
app.use(express.static('public')); //using the static files by express server. ex:styles.css, assets etc.

// bodyParser middleware for parsing the data to JSON
app.use(bodyParser.urlencoded({extended:true}));



app.listen(PORT,()=>{
    console.log('Server started at port '+PORT+' bro!');
});