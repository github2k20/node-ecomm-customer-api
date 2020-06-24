const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false })
    .then(() => winston.info(`Connected to Database...`));
}