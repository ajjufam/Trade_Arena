const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userRole: { type: String },
  resourceType: { type: String }, // e.g., 'User'
  oldData: { type: mongoose.Schema.Types.Mixed }, // optional - before update/delete
  newData: { type: mongoose.Schema.Types.Mixed }, // optional - after create/update
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
});

module.exports = mongoose.model("Audit", auditSchema);
