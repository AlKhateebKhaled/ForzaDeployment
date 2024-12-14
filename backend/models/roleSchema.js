const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  permission: { type: [String], required: true },
});

const model = mongoose.model("Role", roleSchema);
module.exports = model;
