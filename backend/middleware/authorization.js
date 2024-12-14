const authorization = (action) => {
    return (req, res, next) => {
      if (req.token.role.permission.includes(action)) {
        return next();
      } else {
        return res.status(403).json({ success: false, message: "Unauthorized" });
      }
    };
  };
  
  module.exports = authorization;
  