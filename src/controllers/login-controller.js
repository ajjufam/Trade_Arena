const AppError = require("../utils/error-handler-util");
const User = require("../models/user-model");
const Audit = require("../models/audit-model");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("email and password required", 400));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new AppError("Invalid credentials", 400));
    }

    const isValid = user.password === password;

    // Log audit
    await Audit.create({
      action: "LOGIN_ATTEMPT",
      userId: user._id,
      userRole: user.role,
      resourceType: "User",
      ipAddress: req.ip || req.connection.remoteAddress || "UNKNOWN",
      userAgent: req.headers["user-agent"] || "UNKNOWN",
      newData: {
        status: isValid ? "SUCCESS" : "FAILURE",
        email,
      },
    });

    if (isValid) {
      res.status(200).json({
        status: 200,
        message: "login successfully",
        role: user.role,
      });
    } else {
      return next(new AppError("Invalid credentials", 400));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
