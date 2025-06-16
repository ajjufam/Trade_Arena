const User = require("../models/user-model");
const RolesEnum = require("../enums/roles-enum");
const logger = require("../configs/logger-config");
const generateRandomPassword = require("../utils/password-generator-util");
const Audit = require("../models/audit-model");
const { sendEmailWithOutCredentials } = require("../utils/mailer-util");

const createNationalAdminIfNotExist = async (
  ipAddress = "SYSTEM",
  userAgent = "SYSTEM"
) => {
  const existingNationalAdmin = await User.findOne({
    role: RolesEnum.NATIONAL,
  });
  if (!existingNationalAdmin) {
    const tempPassword = generateRandomPassword();
    const defaultEmail = process.env.EMAIL;

    const defaultAdmin = new User({
      prefix: null,
      firstName: null,
      lastName: null,
      fullName: null,
      DOB: null,
      age: null,
      email: defaultEmail,
      password: tempPassword,
      phoneNumber: null,
      role: RolesEnum.NATIONAL,
      access: "all",
      reportinManager: "self",
      createdBy: "self",
    });

    await defaultAdmin.save();

    // Audit
    await Audit.create({
      action: "CREATE_NATIONAL_ADMIN",
      userId: defaultAdmin._id,
      userRole: RolesEnum.NATIONAL,
      resourceType: "User",
      newData: {
        email: defaultEmail,
        role: RolesEnum.NATIONAL,
      },
      ipAddress,
      userAgent,
    });

    await sendEmailWithOutCredentials(
      defaultEmail,
      tempPassword,
      RolesEnum.NATIONAL
    );

    logger.info(
      "✅ National Admin created, credential sent to emailId:",
      defaultEmail
    );
  }
};

module.exports = { createNationalAdminIfNotExist };
