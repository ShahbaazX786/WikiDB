const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT,()=>{
    console.log('Server started at port '+PORT+' bro!');
})