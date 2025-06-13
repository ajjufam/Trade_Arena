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
    new transports.Console(), // colorized output in console
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: combine(
        timestamp(),
        printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
    new transports.File({
      filename: "logs/combined.log",
      format: combine(
        timestamp(),
        printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

module.exports = logger;
