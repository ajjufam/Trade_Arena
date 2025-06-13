"use strict";

const mongoose = require("mongoose");
const logger = require("./logger-config");
const connecttionString = process.env.DB_URI;

const connectDb = () => {
  mongoose
    .connect(connecttionString)
    .then(() => logger.info(`Connected to DB successfully`))
    .catch((err) => logger.info(`Error while connecting to DB : ${err}`));
};

module.exports = connectDb;
