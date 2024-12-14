const rolemodel = require("../models/roleSchema");

const createRole = async (req, res) => {
  try {
    const { roleName, permission } = req.body;

    const newRole = new rolemodel({
      roleName,
      permission,
    });

    await newRole.save();

    res.status(201).json({
      success: true,
      message: "Role Created Successfully",
      role: newRole,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createRole };
