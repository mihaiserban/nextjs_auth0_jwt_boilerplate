const mongoose = require('mongoose');

const connectWithDB = (url) => {
    //connect to db
    mongoose.Promise = require('bluebird');
    mongoose.connect(url);
}

module.exports = connectWithDB;