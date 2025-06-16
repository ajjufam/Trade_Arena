const mongoose = require("mongoose");
const RolesEnum = require("../enums/roles-enum");
const PrefixEnum = require("../enums/prefix-enum");

const userSchema = new mongoose.Schema({
  prefix: {
    type: String,
    enum: PrefixEnum,
    default: PrefixEnum.MR,
  },
  firstName: String,
  lastName: String,
  fullName: String,
  DOB: Date,
  age: Number,
  email: String,
  password: String,
  phoneNumber: String,
  role: {
    type: String,
    enum: Object.values(RolesEnum),
    default: RolesEnum.HELPER,
  },
  access: [String],
  reportinManager: String,
  createdBy: String,
});

module.exports = mongoose.model("User", userSchema);
