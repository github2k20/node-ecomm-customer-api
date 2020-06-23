const express = require('express');
// const genres = require('../routes/genres');
// const customers = require('../routes/customers');
const products = require('./../routes/products');
// const rentals = require('../routes/rentals');
const users = require('./../routes/users');
const authenticate = require('./../routes/authenticate');
// const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  // app.use('/api/genres', genres);
  // app.use('/api/customers', customers);
  app.use('/api/products', products);
  // app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/login', authenticate);
  // app.use('/api/returns', returns);
  app.use(error);
}