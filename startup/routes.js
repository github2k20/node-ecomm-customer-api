const express = require('express');
const products = require('./../routes/products');
const users = require('./../routes/users');
const authenticate = require('./../routes/authenticate');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/products', products);
  app.use('/api/users', users);
  app.use('/api/login', authenticate);
  app.use(error);
}