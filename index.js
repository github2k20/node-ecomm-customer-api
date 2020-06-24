const winston = require("winston");
const express = require("express");
const app = express();

//require("./startup/logging")();
//require("./startup/cors")(app);
require('./config/config')
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const port = process.env.PORT 
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
