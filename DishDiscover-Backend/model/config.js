const mongoose = require('mongoose');
const mongodburl = require('./keys').url.mongodb;

mongoose.connect(mongodburl)
     .then(() => console.log('db configured!'))
     .catch(err => console.log(err));