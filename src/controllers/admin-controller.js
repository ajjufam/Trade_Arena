const AppError = require("../utils/error-handler-util");

const sample = (req, res, next) => {
  try {
    const success = true;
    if (success) {
      res.status(200).json({ data: "Success" });
    } else return next(new AppError("Fail", 400));
  } catch (error) {
    return next(new AppError(`Catch ,${error.message[1]}`, 500));
  }
};

module.exports = { sample };
