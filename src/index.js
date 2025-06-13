"use strict";

const envConfig = require("./configs/env-config");
const express = require("express");
const connectDb = require("./configs/db-config");
const logger = require("./configs/logger-config");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const globalErrorHandler = require("./middlewares/error-handler-middleware");

//routers
const adminRouter = require("./routes/admin-routes");

const app = express();
connectDb(); // Connect to DB
app.use(cors()); // Enable CORS
app.use(helmet()); // Set Security Headers
// app.use(xssClean()); // Prevent XSS attacks (Thows Error)
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Limit repeated requests to public APIs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json()); // Body parser

app.use("/api/v1", adminRouter);
app.use(globalErrorHandler); // global error handler
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running at ${PORT}`);
});
