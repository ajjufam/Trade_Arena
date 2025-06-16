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
const {
  createNationalAdminIfNotExist,
} = require("./controllers/user-controller");

//routers
const adminRouter = require("./routes/admin-routes");
const loginRouter = require("./routes/login-routes");

const app = express();

(async () => {
  try {
    await connectDb(); // Connect to DB
    app.use(cors()); // Enable CORS
    app.use(helmet()); // Set Security Headers
    // app.use(xssClean()); // Prevent XSS attacks (Throws Error)
    app.use(hpp()); // Prevent HTTP Parameter Pollution

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    });
    app.use(limiter);
    app.use(express.json());

    // 👉 Call admin creator after DB connection
    await createNationalAdminIfNotExist();

    app.use("/api/v1", loginRouter);
    app.use(globalErrorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`🚀 Server running at port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
})();
