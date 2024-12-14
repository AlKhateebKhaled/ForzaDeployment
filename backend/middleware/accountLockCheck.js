const accountLockCheck = (req, res, next) => {
  if (req.token.accountStatus === "locked") {
    return res.status(403).json({
      success: false,
      message: "Your account is locked. Please contact the admin.",
    });
  }
  next();
};

module.exports = accountLockCheck;
