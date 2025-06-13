// logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Custom colorize entire line based on log level
const customFormat = combine(
  colorize({ all: true }), // Color entire line, not just level
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const logger = createLogger({
  level: "info",
  format: customFormat,
  transports: [
    new transports.Console(), // Only log to console
  ],
});

module.exports = logger;
