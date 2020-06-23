const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => winston.info(`Connected to ${db}...`));
}